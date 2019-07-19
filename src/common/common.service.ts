import { Injectable } from '@nestjs/common';
import * as util from 'util';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as nodemailer         from 'nodemailer';
import * as sparkPostTransport from 'nodemailer-sparkpost-transport';

@Injectable()
export class CommonService {

    private readonly transport = nodemailer.createTransport(sparkPostTransport({
        'sparkPostApiKey': '799dec27c0a8a5d7609f8007149bcd9fe700186a'
    }));

    /**
     * 
     * @param {String} location Caminho do template html
     * @returns {String} Retorna a string do arquivo
     * @description Usado para retornar um arquivo html em string
     */
    public async getEjsTemplate(location : string) : Promise<any> {
        const readFile = util.promisify(fs.readFile)
        try {
            console.log(await readFile(location, 'utf-8'));
            
            return await readFile(location, 'utf-8');
        } catch (e) {
            Promise.reject(e);
        }
    }

    /**
     * 
     * @param {String} template String do template a ser renderizado
     * @param {Object} data Objeto a ser renderizado no template
     * @returns {String} Retorna a string já renderizada pela engine EJS
     * @description Metodo para renderizar o template EJS
     */
    public async renderEjsTemplate(template : string, data : any) : Promise<string> {
        return await ejs.render(template, data);
    }

    /**
     * 
     * @param {nodemailer.SendMailOptions} options Opções enviadas para o transporter de e-mail
     * @returns Não sei ainda
     * @description Método para envio de e-mail
     */
    public async sendMail(options : nodemailer.SendMailOptions) : Promise<any> {
        let _options = {
            from: 'DDsys - Gestão para Dedetizadoras <naoresponder@mail.ddsys.com.br>',
            subject: 'Bem vindo ao DDsys!',
            ...options
        };

        return await this.transport.sendMail(_options);
    }

}
