// Note: At this point, you could also have created a file called pages/api/post.ts` instead of taking the 
// detour with an extra directory and an index.ts file. The reason why you're not doing it that way is because 
// you'll need to add a dynamic route for HTTP DELETE requests at the api/post route later as well. In order to 
// save some refactoring later, you're already structuring the files in the required way.

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth"
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return
  }
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}