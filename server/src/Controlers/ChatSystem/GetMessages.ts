import { Request, Response } from "express";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

function queryAsync(db: any, sql: string, params?: any[]) {
  return new Promise<any[]>((resolve, reject) => {
    db.query(sql, params, (error: Error, results: any[]) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
}

export default async (req: Request, res: Response, db: Connection) => {
  try {
    const user1 = req.query.user1 as string;
    const user2 = req.query.user2 as string;

    if (!user1 || !user2) {
      return res.status(400).json({ error: "user1 and user2 are required" });
    }
    const [user1Result] = await queryAsync(db, `SELECT id FROM users WHERE username = ?`, [user1]);
    const [user2Result] = await queryAsync(db, `SELECT id FROM users WHERE username = ?`, [user2]);

    if (!user1Result || !user2Result) {
      return res.status(404).json({ error: "One or both users not found" });
    }

    const firstLogin = user1Result.id;
    const secondLogin = user2Result.id;

    const [chatResult] = await queryAsync(
      db,
      `SELECT id FROM chats WHERE 
      (FirstuserId = ? AND SeconduserId = ?) 
      OR (FirstuserId = ? AND SeconduserId = ?)`,
      [firstLogin, secondLogin, secondLogin, firstLogin]
    );

    if (!chatResult) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const chatId = chatResult.id;

    const messages = await queryAsync(
      db,
      `SELECT m.content,
       m.id,
       HOUR(m.created_at) AS hour,
       MINUTE(m.created_at) AS minute,
       u.username
FROM messages m
JOIN users u ON m.sender_id = u.id
WHERE m.chat_id = ?
ORDER BY m.id ASC;

       `,
      [chatId]
    );
   console.log(messages);
    const contacts = await queryAsync(db, `SELECT username FROM users`);
    res.json({ messages, contacts,chatId });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err });
  }
};
