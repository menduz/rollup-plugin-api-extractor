import { PluginContext } from 'rollup'
import { ExtractorLogLevel, ExtractorMessage, ExtractorMessageCategory } from '@microsoft/api-extractor'

export const handleApiExtractorMessages = (context: PluginContext, message: ExtractorMessage) => {
  message.handled = true

  if (message.logLevel === ExtractorLogLevel.None) {
    return
  }

  if (message.category === ExtractorMessageCategory.Console &&
    (message.logLevel !== ExtractorLogLevel.Error && message.logLevel !== ExtractorLogLevel.Warning)) {
    return
  }

  if (message.logLevel === ExtractorLogLevel.Error) {
    context.error(message.formatMessageWithLocation(__dirname), {
      column: message.sourceFileColumn ?? -1,
      line: message.sourceFileLine ?? -1
    })
  } else {
    context.warn(message.formatMessageWithLocation(__dirname), {
      column: message.sourceFileColumn ?? -1,
      line: message.sourceFileLine ?? -1
    })
  }
}
