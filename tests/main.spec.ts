import { expect, TestSuite, FTestSuite, Test, FTest, XTestSuite } from "testyts"
import * as winston from "winston"

import Sentry from "../src/index"

import * as _Sentry from '@sentry/node'

const sentryOptions = {
  config: {
    dsn: "https://******@sentry.io/12345"
  },
  level: "error",

}


@TestSuite()
export class MainTestSuite {
  @Test()
  testError() {
    const logger = winston.createLogger()
    logger.add(new Sentry(sentryOptions))

    logger.info("Test starting...", "333")

    logger.error("error on testFunction1.", new Error("this is a error"))
    logger.error("error on testFunction2.", "this is a error message" as any)

    expect.toBeTrue(true)
  }

  @Test()
  testSentry() {
    _Sentry.init({ dsn: sentryOptions.config.dsn })
    _Sentry.captureMessage("Test message", _Sentry.Severity.Error)

    expect.toBeTrue(true)
  }
}
