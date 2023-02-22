import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';

interface IRequest{
    email: string;
  }
  
  export default class SendForgotPasswordEmailService{

    public async execute({ email }: IRequest) : Promise<void>{
      const usersRepository = getCustomRepository(UsersRepository);
      const usersTokensRespository = getCustomRepository(UserTokensRepository);
      const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
  
      const user = await usersRepository.findByEmail(email);
      if(!user){
        throw new AppError('User does not exists.');
      }
  
      const {token} = await usersTokensRespository.generate(user.id);
      

      console.log(token);
      await EtherealMail.sendMail({
        to: {name: user.name, email: user.email}, 
        subject: '[Locadora Unicentro] Recuperação de Senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3333/reset_password?token=${token}`,
          },
        },
    });
    }
  }
  
  