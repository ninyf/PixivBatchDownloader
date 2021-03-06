// 初始化 bookmark_detail 页面
import { InitPageBase } from '../InitPageBase'
import { Colors } from '../Colors'
import { lang } from '../Lang'
import { DOM } from '../DOM'
import { options } from '../setting/Options'
import { API } from '../API'
import { store } from '../Store'

class InitBookmarkDetailPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  protected addCrawlBtns() {
    DOM.addBtn('crawlBtns', Colors.blue, lang.transl('_抓取相似图片'), [
      ['title', lang.transl('_抓取相似图片')],
    ]).addEventListener(
      'click',
      () => {
        this.readyCrawl()
      },
      false,
    )
  }

  protected setFormOption() {
    // 个数/页数选项的提示
    options.setWantPageTip({
      text: lang.transl('_个数'),
      tip: lang.transl('_想要获取多少个作品'),
      rangTip: `1 - ${this.maxCount}`,
    })
  }

  protected getWantPage() {
    this.crawlNumber = this.checkWantPageInputGreater0(this.maxCount, false)
  }

  // 获取相似的作品列表
  protected async getIdList() {
    let data = await API.getRecommenderData(API.getIllustId(), this.crawlNumber)

    for (const id of data.recommendations) {
      store.idList.push({
        type: 'unknown',
        id: id.toString(),
      })
    }

    this.getIdListFinished()
  }

  protected resetGetIdListStatus() {}
}
export { InitBookmarkDetailPage }
