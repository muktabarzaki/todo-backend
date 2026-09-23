import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.createUser(username, email, hashedPassword);

        res.status(201).json({ success: true, message: 'Registrasi berhasil!' });
    } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ success: false, message: 'Username atau Email sudah terdaftar!' });
        } else {
            res.status(500).json({ success: false, message: 'Error server.' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = (await userModel.getUserByUsername(username) as any)[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ success: false, message: 'Username atau password salah!' });
            return;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login berhasil!', token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error server.' });
    }
};