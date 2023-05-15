import { UnlikePost } from "@teamkeel/sdk";

export default UnlikePost(async (ctx, inputs, api) => {
  const likes = await api.models.like.findMany({
    postId: inputs.postId,
    profileId: inputs.profileId,
  });
  if (likes.length === 0) {
    // This is odd
    return "";
  }
  if (likes.length > 1) {
    throw new Error("more than one like");
  }

  return api.models.like.delete({ id: likes[0].id });
});
