import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
        ctx.json([
            { name: "Chocolate", imagePath: "/images/chocolate.png" },
            { name: "Vanilla", imagePath: "/images/vanilla.png" },
          ])
          )
        })
    ]

// http://localhost:3030/scoops
// This is a frequent question: Why not use Jest mocks or Sinon for the axios methods? Is it really necessary to use Mock Service Worker?

// There are several reasons to use Mock Service Worker over mocking axios:

// For this app, we make two requests at the same time (scoops and toppings on the options page), and it would be difficult to manage that with mock return values -- as well as brittle: if you re-arrange your page then your tests could fail because your return values were in the wrong order on your mock.

// You may want to return values based on, say, the POST data of the request. MSW allows for this with the handler functions.

// MSW can handle sophisticated aspects of requests such as cookies and binary responses like images.

// You may decide to switch the method you use to make server requests (fetch to axios, say), and MSW will work regardless of the method you use.
