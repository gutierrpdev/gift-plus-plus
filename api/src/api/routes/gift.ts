import {
  CreateGiftRequest,
  createGiftRequestSchema,
  CreateGiftResponse,
  GetGiftResponse,
} from '../../common/api-schema';
import { assertNever } from '../../util-libs/prelude';
import { checkUrl, checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


router.post('/gift', async (ctx) => {
  const body = await checkBody<CreateGiftRequest>(ctx, createGiftRequestSchema);

  // Transcode the assets...

  const rgUpload = await ctx.lib.storage.getUserUpload(body.recipientGreeting);
  const rgTranscodeResult = await ctx.lib.transcode.transcodeAudio(rgUpload);
  const rgAsset = await ctx.lib.storage.uploadAsset(
    `${Math.round(Date.now())}.${rgTranscodeResult.extension}`,
    rgTranscodeResult.stream,
  );

  const assetReplacedParts: Array<{ photo: string, note: string, clue: string }> = [];

  for (const part of body.parts) {
    const photoUpload = await ctx.lib.storage.getUserUpload(part.photo);
    const photoTranscodeResult = await ctx.lib.transcode.transcodeImage(photoUpload);
    const photoAsset = await ctx.lib.storage.uploadAsset(
      `${Math.round(Date.now())}.${photoTranscodeResult.extension}`,
      photoTranscodeResult.stream,
    );

    const noteUpload = await ctx.lib.storage.getUserUpload(part.note);
    const noteTranscodeResult = await ctx.lib.transcode.transcodeAudio(noteUpload);
    const noteAsset = await ctx.lib.storage.uploadAsset(
      `${Math.round(Date.now())}.${noteTranscodeResult.extension}`,
      noteTranscodeResult.stream,
    );

    assetReplacedParts.push({
      photo: photoAsset,
      note: noteAsset,
      clue: part.clue,
    });
  }

  const result = await ctx.lib.gift.create({
    id: body.id,
    kind: 'PersonalGift',
    accountId: body.id, // TODO!!!!!!
    museumId: body.museumId,
    senderName: body.senderName,
    recipientName: body.recipientName,
    recipientGreeting: rgAsset,
    parts: assetReplacedParts,
  });

  if (result.kind === 'Success') {
    ctx.status = 201;
    (ctx as { body: CreateGiftResponse }).body = result.data;
    return;
  }

  if (result.kind === 'IdAlreadyExists') {
    ctx.throw(409, { error: 'That gift ID already exists' });
    return;
  }

  assertNever(result);
});


router.get('/gift/:giftId', async (ctx) => {
  const { giftId } = checkUrl(ctx, 'giftId');

  const gift = await ctx.lib.gift.findById(giftId);

  if (!gift) {
    ctx.throw(404);
    return;
  }

  (ctx as { body: GetGiftResponse }).body = gift;
});
