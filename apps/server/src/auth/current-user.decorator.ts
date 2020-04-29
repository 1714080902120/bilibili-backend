
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: any, req: { user: any; }) => req.user);
