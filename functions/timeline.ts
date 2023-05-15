import { Timeline } from "@teamkeel/sdk";

export default Timeline(async (ctx, inputs, api) => {
  const follows = await api.models.follow.findMany({
    fromId: inputs.where.profileId,
  });
  const likes = await api.models.like.findMany({
    profileId: inputs.where.profileId,
  });

  return api.models.post
    .where({
      authorId: {
        oneOf: follows.map((x) => x.id),
      },
    })
    .orWhere({
      id: {
        oneOf: likes.map((x) => x.id),
      },
    })
    .findMany();
});
