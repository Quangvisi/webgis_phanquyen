import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
//let check = bcrypt.compareSync(password, hashPassword); // true

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'mydatabase', Promise: bluebird });
    try {
        const [rows, fields] =
            await connection.execute('INSERT INTO users (email, password, username)  VALUES (?, ?, ?)',
                [email, hashPass, username]);
    } catch (error) {
        console.log(">>>check error createNewUser:", error);
    }
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'mydatabase', Promise: bluebird });

    // let users = [];
    // // connection.query(
    // //     'Select * from users',
    // //     function (err, results, fields) {
    // //         if (err) {
    // //             console.log(err);
    // //             return users;
    // //         }
    // //         users = results;
    // //         console.log(">>>run get user list:", users);
    // //         return users;
    // //     }
    // // );

    try {
        // query database
        const [rows, fields] = await connection.execute('Select * from users');
        // console.log(">>>check rows:", rows);
        return rows;
    } catch (error) {
        console.log(">>>check error getUserList:", error);
    }
}

const deleteUser = async (id) => {
    const connection =
        await mysql.createConnection({ host: 'localhost', user: 'root', database: 'mydatabase', Promise: bluebird });

    try {
        // query database
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        // console.log(">>>check rows:", rows);
        return rows;
    } catch (error) {
        console.log(">>>check error deleteUser:", error);
    }
}

const getUserById = async (id) => {
    const connection =
        await mysql.createConnection({ host: 'localhost', user: 'root', database: 'mydatabase', Promise: bluebird });

    try {
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        // console.log(">>>check rows:", rows);
        return rows;
    } catch (error) {
        console.log(">>>check error getUserById:", error);
    }
}
module.exports = {
    createNewUser, getUserList, deleteUser
}