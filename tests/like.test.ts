import { it, expect } from "vitest";
import { models, actions } from "@teamkeel/testing";

it("should not allow creating a like on behalf of another profile", async () => {
  const identityA = await models.identity.create({
    email: "joe@domain.com",
  });

  const identityB = await models.identity.create({
    email: "sue@domain.com",
  });

  const profileB = await models.profile.create({
    identityId: identityB.id,
    username: "sue",
  });

  const identityC = await models.identity.create({
    email: "larry@domain.com",
  });

  const profileC = await models.profile.create({
    identityId: identityC.id,
    username: "larry",
  });

  const post = await models.post.create({
    authorId: profileC.id,
    body: "My important words",
  });

  expect(
    actions.withIdentity(identityA).likePost({
      post: {
        id: post.id,
      },
      profile: {
        id: profileB.id,
      },
    })
  ).to.toHaveAuthorizationError();
});
