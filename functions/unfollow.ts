import { Unfollow } from "@teamkeel/sdk";

export default Unfollow(async (ctx, inputs, api) => {
  const follows = await api.models.follow.findMany({
    fromId: inputs.fromId,
    toId: inputs.toId,
  });
  if (follows.length === 0) {
    return "";
  }
  if (follows.length > 1) {
    throw new Error("more than one follow");
  }

  return api.models.follow.delete({
    id: follows[0].id,
  });
});
