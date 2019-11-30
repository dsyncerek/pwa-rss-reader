import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class RssService {
  private readonly parser = new Parser();

  public async parseBlogRssUrl(url: string): Promise<Parser.Output> {
    return this.parser.parseURL(url);
  }
}
