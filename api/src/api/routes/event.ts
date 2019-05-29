import {
  CreateAppEventRequest,
  createAppEventSchema,
} from '../../common/api-schema';
import { checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


router.post('/app-event', async (ctx) => {
  const body = await checkBody<CreateAppEventRequest>(ctx, createAppEventSchema);

  await ctx.lib.event.recordAppEvents(body);
  ctx.status = 204;
});
