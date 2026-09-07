import db from '../db'
export default class ChatService {

    async Delete(id: number): Promise<void> {
        const sql = 'DELETE FROM messages WHERE id = $1';
        await db.query(sql,[id]);
    }

    async Edit(id: number, content: string): Promise<void> {
        const sql = 'UPDATE messages SET content=$1 WHERE id = $2';
        await db.query(sql, [content, id]);
    }

    async Send(login: string, chatId: number, message: string,image:string): Promise<void> {
        const selectSql = 'SELECT id FROM users WHERE username = $1';
        const [user] = (await db.query(selectSql, [login])).rows;
        if (!user) throw new Error("User not found");

        const insertSql = 'INSERT INTO messages(chat_id, sender_id, content,image) VALUES ($1,$2,$3,$4)';
        await db.query(insertSql, [chatId, user.id, message,image]);
    }

    async getMessages(user1: string, user2: string,currentPage:string): Promise<any> {
        try {
            if (!user1 || !user2) return null;

            const [user1Result] = (await db.query(
                `SELECT id FROM users WHERE username = $1`, [user1]
            )).rows;
            const [user2Result] = (await db.query(
                `SELECT id FROM users WHERE username = $1`, [user2]
            )).rows;

            if (!user1Result || !user2Result) return null;

            const firstLogin = user1Result.id;
            const secondLogin = user2Result.id;

            const [chatResult] = (await db.query(
                `SELECT id FROM chats WHERE 
                 (FirstuserId = $1 AND SeconduserId = $2) 
                 OR (FirstuserId = $3 AND SeconduserId = $4)`,
                [firstLogin, secondLogin, secondLogin, firstLogin]
            )).rows;

            if (!chatResult) return null;

            const chatId = chatResult.id;

            const messages = (await db.query(
    `SELECT 
        m.content,
        m.id,
        EXTRACT(HOUR FROM m.created_at) AS hour,
        EXTRACT(MINUTE FROM m.created_at) AS minute,
        u.username,
        m.image
     FROM messages m
     JOIN users u ON m.sender_id = u.id
     WHERE m.chat_id = $1
     ORDER BY m.created_at DESC
     LIMIT 20 
     OFFSET ($2-1) * 20`,
    [chatId,currentPage] 
    
)).rows;

            const contacts = (await db.query(`SELECT username FROM users`)).rows;

            return { messages, contacts, chatId };

        } catch (err) {
            console.error("getMessages error:", err);
            return null;
        }
    }
}
