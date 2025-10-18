
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prismaClient'; // asegúrate que tu cliente esté bien importado

export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el registro' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      res.json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el login' });
    }
  },
};
