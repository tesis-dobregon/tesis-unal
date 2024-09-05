// Keep this file, it's needed for the project when the backend is deployed to register all services in the container
import ApiService from '../services/api.service';
import UsersService from '../services/users.service';
import SensorsService from '../services/sensors.service';
import IngestionService from '../services/ingestion.service';
import AQIService from '../services/aqi.service';
import AlertsService from '../services/alerts.service';
import MailService from '../services/mail.service';

export {
  ApiService,
  UsersService,
  SensorsService,
  IngestionService,
  AQIService,
  AlertsService,
  MailService,
};
