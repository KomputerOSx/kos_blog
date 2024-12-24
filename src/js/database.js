import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();



const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();






export async function getBlogs() {
    const [rows] = await pool.query("select * from blogs");
    return rows
}

export async function getBlog(id) {
    const [rows] = await pool.query("select * from blogs where id = ?", id);
    return rows[0]
}

export async function newBlog(blog) {
    const query = 'INSERT INTO blogs (title, content) VALUES (?, ?)';
    const values = [blog.title, blog.content]; // Ensure you're accessing title and content correctly

    try {
        await pool.query(query, values);
        console.log("New blog created successfully");
    } catch (error) {
        console.error('Database error:', error); // Log any database errors
        throw error; // Rethrow the error to be caught in the route handler
    }
}

export async function updateBlog(id, title, content) {
    const query = 'UPDATE blogs SET title = ?, content = ? WHERE id = ?';
    const values = [title, content, id]; // Ensure you're accessing title and content correctly

    try {
        await pool.query(query, values);
        console.log("BLOG UPDATED successfully");
    } catch (error) {
        console.error('Database error:', error); // Log any database errors
        throw error; // Rethrow the error to be caught in the route handler
    }
}

export async function deleteBlog(id) {
    const query = 'DELETE FROM blogs WHERE id = ?';
    try {
        const [result] = await pool.query(query, [id]);
        console.log(`BLOG DELETED SUCCESSFULLY with Id ${id}`);
        return result;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}
export function formatWithBreaks(text) {
    // Assuming you have a sanitize function, otherwise remove it
    return text.replace(/\r\n?/g, "\n").replace(/\n/g, '<br>');
}


export function remove_formatWithBreaks(text) {
    return text.replace(/<br>/g, '\n').replace(/\n/g, '\r\n');
}
