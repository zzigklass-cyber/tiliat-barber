export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const token = process.env.BOT_TOKEN;
  const secret = process.env.WEBHOOK_SECRET;

  if (!token || !secret) {
    return res.status(500).send('Missing configuration');
  }

  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.status(403).send('Forbidden');
  }

  const message = req.body?.message;

  if (!message || message.chat.type !== 'private') {
    return res.status(200).send('OK');
  }

  const chatId = message.chat.id;
  const command = message.text?.split(' ')[0];

  if (command === '/start') {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text:
              '💈 <b>Добро пожаловать в TILIAT BARBER!</b>\n\n' +
              'Твой стиль. Твои правила.\n\n' +
              '✂️ Познакомься с нашими мастерами.\n' +
              '📋 Посмотри услуги и цены.\n' +
              '📅 Попробуй онлайн-запись.\n\n' +
              'Демонстрационный проект TILIAT STUDIO.',
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '💈 Записаться',
                    web_app: {
                      url: 'https://tiliat-barber.vercel.app',
                    },
                  },
                ],
              ],
            },
          }),
        }
      );

      if (!response.ok) {
        return res.status(502).send('Telegram API error');
      }
    } catch {
      return res.status(500).send('Bot error');
    }
  }

  return res.status(200).send('OK');
}