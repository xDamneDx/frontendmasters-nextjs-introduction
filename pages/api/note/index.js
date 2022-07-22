import { createRouter } from "next-connect";
import notes from "../../../src/data/data";

const router = createRouter();

router
  .get((req, res) => {
    res.json({ data: notes });
  })
  .post((req, res) => {
    const id = Date.now();
    const note = { ...req.body, id };

    notes.push(note);
    res.json({ data: note });
  });

export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
