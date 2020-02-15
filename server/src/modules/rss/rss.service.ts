import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import * as sanitizeHtml from 'sanitize-html';
import { sanitizeHtmlConfig } from '../../config/sanitize-html.config';

@Injectable()
export class RssService {
  private readonly parser = new Parser();

  public async parseBlogRssUrl(url: string): Promise<Parser.Output> {
    const parsed = await this.parser.parseURL(url);

    parsed.items = parsed.items.map(item => {
      try {
        const content = sanitizeHtml(item.content, sanitizeHtmlConfig);
        return { ...item, content };
      } catch {
        return { ...item, content: '' };
      }
    });

    return parsed;
  }
}
