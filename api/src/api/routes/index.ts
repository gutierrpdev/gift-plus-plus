import { ApiRouter } from './router';
import { router as giftRouter } from './gift';

export const router = new ApiRouter();

router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});

router.use(giftRouter.routes());
