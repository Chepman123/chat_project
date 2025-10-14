import { Connection, QueryError, FieldPacket } from "mysql2";

export default class ChatService {
    constructor(private db: Connection) {}

    async Delete(id: number): Promise<void> {
        const sql = 'DELETE FROM messages WHERE id = ?';
        await this.queryAsync(sql, [id]);
    }

    async Edit(id: number, content: string): Promise<void> {
        const sql = 'UPDATE messages SET content=? WHERE id = ?';
        await this.queryAsync(sql, [content, id]);
    }

    async Send(login: string, chatId: number, message: string): Promise<void> {
        const selectSql = 'SELECT id FROM users WHERE username = ?';
        const [user] = await this.queryAsync(selectSql, [login]);
        if (!user) throw new Error("User not found");

        const insertSql = 'INSERT INTO messages(chat_id, sender_id, content) VALUES (?,?,?)';
        await this.queryAsync(insertSql, [chatId, user.id, message]);
    }

    async getMessages(user1: string, user2: string): Promise<any> {
        try {
            if (!user1 || !user2) return null;

            const [user1Result] = await this.queryAsync(
                `SELECT id FROM users WHERE username = ?`, [user1]
            );
            const [user2Result] = await this.queryAsync(
                `SELECT id FROM users WHERE username = ?`, [user2]
            );

            if (!user1Result || !user2Result) return null;

            const firstLogin = user1Result.id;
            const secondLogin = user2Result.id;

            const [chatResult] = await this.queryAsync(
                `SELECT id FROM chats WHERE 
                 (FirstuserId = ? AND SeconduserId = ?) 
                 OR (FirstuserId = ? AND SeconduserId = ?)`,
                [firstLogin, secondLogin, secondLogin, firstLogin]
            );

            if (!chatResult) return null;

            const chatId = chatResult.id;

            const messages = await this.queryAsync(
                `SELECT 
                    m.content,
                    m.id,
                    HOUR(m.created_at) AS hour,
                    MINUTE(m.created_at) AS minute,
                    u.username
                 FROM messages m
                 JOIN users u ON m.sender_id = u.id
                 WHERE m.chat_id = ?
                 ORDER BY m.id ASC`,
                [chatId]
            );

            const contacts = await this.queryAsync(`SELECT username FROM users`);

            return { messages, contacts, chatId };

        } catch (err) {
            console.error("getMessages error:", err);
            return null;
        }
    }

    private queryAsync(sql: string, params?: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, (error: QueryError | null, results: any[], fields: FieldPacket[]) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    }
}
