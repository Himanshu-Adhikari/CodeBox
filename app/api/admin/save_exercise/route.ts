import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { ExerciseTable } from "@/config/schema";
const Data = [
  {
    courseId: 2,
    exerciseId: "explore-the-web-skeleton",
    exerciseName: "Explore the Web Skeleton",
    chapterId: 1,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>The Skeleton of the Web</h2><p>A website is like a living structure.</p><p>The <code style='color:#facc15'>&lt;html&gt;</code> tag is the outer shell.</p><p>It tells the browser where everything begins.</p><p>Browsers read HTML from top to bottom.</p><p>The <code style='color:#facc15'>&lt;head&gt;</code> stores hidden information.</p><p>Titles and metadata live there.</p><p>The <code style='color:#facc15'>&lt;body&gt;</code> is the visible world.</p><p>This is where users see content.</p><p>If the structure breaks, the page breaks.</p><p>This is your first core skill.</p><p>Master structure to gain control.</p><p>The web responds to clean HTML.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Create a valid HTML structure.</p><p>Use <code style='color:#facc15'>&lt;html&gt;</code>, <code style='color:#facc15'>&lt;head&gt;</code>, and <code style='color:#facc15'>&lt;body&gt;</code>.</p><p>Add an h1 saying <strong>Welcome Explorer</strong>.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>HTML has one root element.</p><p>Visible content always goes in body.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    <title></title>\n  </head>\n  <body>\n    \n  </body>\n</html>",
      },
      regex: "<h1>\\s*Welcome Explorer\\s*</h1>",
      output: "Welcome Explorer",
      hintXp: 30,
    },
  },

  {
    courseId: 2,
    exerciseId: "build-your-base-camp",
    exerciseName: "Build Your Base Camp",
    chapterId: 2,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>Building Your Base Camp</h2><p>This is where users arrive.</p><p>The <code style='color:#facc15'>&lt;h1&gt;</code> tag is your main heading.</p><p>It defines the purpose of the page.</p><p><code style='color:#facc15'>&lt;p&gt;</code> tags explain details.</p><p>Each paragraph is one idea.</p><p>Good structure improves readability.</p><p>Search engines prefer clean HTML.</p><p>One h1 keeps things focused.</p><p>Paragraphs keep content readable.</p><p>A strong base invites users.</p><p>Structure makes pages professional.</p><p>Build it carefully.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Add one <code style='color:#facc15'>&lt;h1&gt;</code> titled My Base Camp.</p><p>Add two paragraph tags.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Use multiple <code style='color:#facc15'>&lt;p&gt;</code> tags.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Base Camp</title>\n  </head>\n  <body>\n    \n  </body>\n</html>",
      },
      regex: "<h1>\\s*My Base Camp\\s*</h1>",
      output: "My Base Camp",
      hintXp: 35,
    },
  },

  {
    courseId: 2,
    exerciseId: "name-your-world",
    exerciseName: "Name Your World",
    chapterId: 3,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>Naming Your World</h2><p>Every page needs a name.</p><p>The <code style='color:#facc15'>&lt;title&gt;</code> tag defines it.</p><p>It appears in the browser tab.</p><p>Search engines read it first.</p><p>A good title explains purpose.</p><p>Keep it short and clear.</p><p>Think of it as an identifier.</p><p>No title means poor visibility.</p><p>This tag belongs in head.</p><p>Never place it in body.</p><p>Titles matter more than you think.</p><p>Name your world properly.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Add a title called My First World.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>The title tag goes inside head.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    \n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>",
      },
      regex: "<title>\\s*My First World\\s*</title>",
      output: "My First World",
      hintXp: 30,
    },
  },

  {
    courseId: 2,
    exerciseId: "break-and-repair",
    exerciseName: "Break And Repair",
    chapterId: 4,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>Break and Repair</h2><p>Every developer breaks code.</p><p>Broken HTML leads to bugs.</p><p>Missing closing tags confuse browsers.</p><p>Indentation helps spot mistakes.</p><p>Browsers try to guess errors.</p><p>Guessing causes unexpected layout.</p><p>Clean HTML prevents issues.</p><p>Debugging builds confidence.</p><p>Fixing structure is essential.</p><p>This is a real-world skill.</p><p>Repair the code calmly.</p><p>Accuracy wins.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Fix the broken HTML so the heading displays.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Check if tags are properly closed.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Broken</title>\n  </head>\n  <body>\n    <h1>Fixed Camp\n  </body>\n</html>",
      },
      regex: "<h1>\\s*Fixed Camp\\s*</h1>",
      output: "Fixed Camp",
      hintXp: 40,
    },
  },

  {
    courseId: 2,
    exerciseId: "html-detective",
    exerciseName: "Html Detective",
    chapterId: 5,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>HTML Detective</h2><p>You must inspect structure carefully.</p><p>HTML has strict placement rules.</p><p>Head is not for visible content.</p><p>Body displays the page.</p><p>Wrong nesting breaks logic.</p><p>Browsers follow structure rules.</p><p>Small mistakes cause big issues.</p><p>Details matter.</p><p>Read HTML like a detective.</p><p>Find misplaced elements.</p><p>Fix the structure.</p><p>Solve the case.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Move the paragraph into the body.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Visible content belongs in body.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    <p>Detective Mode</p>\n  </head>\n  <body>\n    \n  </body>\n</html>",
      },
      regex: "<p>\\s*Detective Mode\\s*</p>",
      output: "Detective Mode",
      hintXp: 45,
    },
  },

  {
    courseId: 2,
    exerciseId: "element-collector",
    exerciseName: "Element Collector",
    chapterId: 6,
    exercisesContent: {
      content:
        "<body style='font-family:Inter,Arial;color:#e5e7eb;line-height:1.8'><h2 style='color:#facc15'>Element Collector</h2><p>HTML elements are your tools.</p><p>Each element serves a purpose.</p><p>Headings guide users.</p><p>Paragraphs explain ideas.</p><p>Correct placement matters.</p><p>Small elements build pages.</p><p>Structure creates clarity.</p><p>Practice improves accuracy.</p><p>HTML rewards precision.</p><p>This is your final test.</p><p>Collect elements wisely.</p><p>Show your mastery.</p></body>",
      task:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Add one <code style='color:#facc15'>&lt;h2&gt;</code> and one <code style='color:#facc15'>&lt;p&gt;</code>.</p></body>",
      hint:
        "<body style='font-family:Inter,Arial;color:#e5e7eb'><p>Both elements must be inside body.</p></body>",
      starterCode: {
        "/index.html":
          "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Collector</title>\n  </head>\n  <body>\n    \n  </body>\n</html>",
      },
      regex: "<h2>.*</h2>",
      output: "Element Collected",
      hintXp: 50,
    },
  },
];

export async function GET(req: NextRequest) {
  await Promise.all(
    Data.map((item) =>
      db.insert(ExerciseTable).values({
        courseId: item?.courseId,
        chapterId: item?.chapterId,
        exerciseId: item?.exerciseId,
        exerciseName: item?.exerciseName,
        exerciseContent: item?.exercisesContent,
      })
    )
  );

  return NextResponse.json("Success");
}
