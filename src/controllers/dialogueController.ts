import { Request, Response, response } from 'express';
// import { dialogueLog, dialogueSubject } from '../routes/dialogue';
import OpenAI from 'openai';
require('dotenv').config();

let dialogueLog: object[] = [];
// let dialogueLog: string[] = [];
let dialogueSubject = "";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const checkSubject = (req: Request, res: Response) => {
    if(dialogueSubject === ""){
        res.status(500).send("등록된 주제가 없습니다. 대화를 시작하기 위해 주제를 등록해 주세요.")
        return false;
    }
    return true;
};

const setSubject = (req: Request, res: Response) => {
    try {
        if(dialogueSubject === "") {
            if(req.body.request && req.body.subject) {
                res.status(500).send("주제만 보내주세요.");
                return false;
            } else if(req.body.request) {
                res.status(500).send("등록된 주제가 없습니다. 대화를 시작하기 위해 주제를 등록해 주세요.")
                return false;
            }
            const { subject } = req.body;
            if(subject === "") {
                res.status(500).send("주제가 비어있습니다.");
                return false;
            }
            dialogueSubject = subject;
        }
    } catch (error) {
        res.status(500).send(error);
        return false;
    }
    return true;
};

const answerRequest = async (request: string) => {
    return await openai.chat.completions.create({
        model: "gpt-4",
        max_tokens: 200,
        messages: [
            {
                "role": "system",
                "content": `상황 : ${dialogueSubject.toString()}\n대화 내역 : ${dialogueLog.toString()}`
            },
            {
                "role": "user",
                "content": request
            }
        ]
    });
};

const dialogueController = {
    request: async (req: Request, res: Response) => {
        if (!setSubject(req, res) || !checkSubject(req, res)) return;
        // if (!checkSubject(res)) return;
        
        if(dialogueLog.length === 0) {
            return res.send(await answerRequest("사용자와 대화를 시작해 주십시오").then(response => {
                dialogueLog.push({
                    "role": response.choices[0].message.role,
                    "message": response.choices[0].message.content
                });
                return response.choices[0].message.content;
            }));
        }
        try {
            const { request } = req.body;
            const response = await answerRequest(request);
            dialogueLog.push({
                "role": "user",
                "message": request
            });
            dialogueLog.push({
                "role": response.choices[0].message.role,
                "message": response.choices[0].message.content
            });
            // dialogueLog.push(`\nuser : ${request}`);
            // dialogueLog.push(`\n${response.choices[0].message.role} : ${response.choices[0].message.content}`);
            return res.send(response.choices[0].message.content);
        } catch (error) {
            return res.json(error);
        }
    },
    response: async (req: Request, res: Response) => {
        try {
            if (!checkSubject(req, res)) return;
            return res.json({
                "subject": dialogueSubject,
                "log": dialogueLog
            });
            // return res.send(`대화 주제 : ${dialogueSubject}\n대화 내역 : \n${dialogueLog.toString()}`);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};

export default dialogueController;