interface HttpRouter {
  addRoute(route: string): HttpRouter;
  build(): HttpRouter;
}

import { Router } from "express";

export class HttpExpressRouter {
  constructor(
    private readonly method: string,
    private readonly route: string,
    private readonly version: string,
    private readonly handler: any,
  ) {
    const router = Router();
    const endpoint = [this.version, this.route].join("/");
    router[this.method](endpoint, async (request, response: any) => {
      new handler().handleRequest(request, response);

      // const accountRepository =
      //   container.resolve<AccountRepository>("AccountRepository");
      // const accountUseCaseFactory = new AccountUseCaseFactory(
      //   accountRepository,
      // );
      // const accountControllerFactory = new AccountControllerFactory(
      //   accountUseCaseFactory,
      // );
      // await accountControllerFactory
      //   .createAccountController()
      //   .handleRequest(req, res);
    });
  }
  // router.get("/", async (req, res) => {
  //   const accountRepository = container.resolve<AccountRepository>("AccountRepository");
  //   const accountUseCaseFactory = new AccountUseCaseFactory(accountRepository);
  //   const accountControllerFactory = new AccountControllerFactory(
  //     accountUseCaseFactory
  //   );
  //
  //   await accountControllerFactory.createAccountController().handleRequest(req, res);
  // });
}

export class HttpRouterBuilder implements HttpRouter {
  private route: string;
  private version: "v1" | "v2" = "v1";
  private method: string;
  private controller: any;

  addMethod(method: string) {
    this.method = method;
    return this;
  }

  addRoute(route: string) {
    this.route = route;
    return this;
  }

  addVersion(version: string) {
    this.version = version as "v1" | "v2";
    return this;
  }

  addHandler(controller: any) {
    this.controller = controller;
    return this;
  }

  static build(): HttpRouter {
    // return new HttpRouter();
    
    return new HttpExpressRouter(
      HttpRouterBuilder.method,
      HttpRouterBuilder.route,
      HttpRouterBuilder.version,
      HttpRouterBuilder.controller,
    );
  }
}

const router = new HttpRouterBuilder().addRoute("/").addMethod("get").addHandler("AccountController").build();
