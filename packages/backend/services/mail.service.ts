// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Mail from 'moleculer-mail';
import path from 'path';

import { ServiceSchema } from 'moleculer';

const MailService: ServiceSchema = {
  name: 'mail',
  mixins: [Mail],
  settings: {
    from: process.env.EMAIL || 'missing-email',
    transport: {
      service: 'Outlook365',
      auth: {
        user: process.env.EMAIL || 'missing-email',
        pass: process.env.EMAIL_PASS || 'missing-pass',
      },
      port: 465,
    },
    templateFolder: path.join(
      __dirname.split('services')[0],
      'email-templates'
    ),

    // Global data for templates
    data: {
      siteName: 'Smart City UNAL',
    },
  },
};

export default MailService;
