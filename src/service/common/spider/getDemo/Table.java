package service.common.spider.getDemo;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import service.common.spider.insertDB.DB_table;

import java.io.IOException;

public class Table {
    public static void main(String args[]) throws IOException {
        Table table = new Table();
        table.getAiqiyiSrc();
    }

    private void school_rercuit() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-117";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements table = doc.getElementsByClass("table");
        Elements tbody = table.select("tbody");
        Elements trs = tbody.select("tr");
        for (Element tr : trs) {
            String company = tr.getElementsByClass("company").text();
            String position = "";
            Elements spans = tr.getElementsByClass("cxxt-position").select("span");
            for (Element span : spans) {
                position += span.text() + ",";
            }
            Elements text_ellipsis = tr.getElementsByClass("text-ellipsis").select("span");
            String address = text_ellipsis.attr("title");
            String time = tr.getElementsByClass("cxxt-time").text();
            DB_table insert = new DB_table();
//            System.out.println(company+position+address+time);
            insert.school_rercuit(company, position, address, time);

        }
    }

    private void filter_job() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-1";
        Connection conn = Jsoup.connect(url).timeout(3000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Element filter_content = doc.getElementsByClass("filter-content").first();
        Elements a = filter_content.getElementsByTag("a");
        for (Element item : a) {
            String linkhref = item.attr("href");
            String linktext = item.text();
            DB_table filter = new DB_table();
            filter.filter_job(linkhref, linktext);
        }
    }

    private void filter_address() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-1";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Element filter_content = doc.getElementsByClass("filter-content").last();
        Elements a = filter_content.getElementsByTag("a");
        for (Element item : a) {
            String linkHref = item.attr("href");
            linkHref = linkHref.replace("/trade-1", "");
            String linkText = item.text();
            DB_table filter = new DB_table();
            filter.filter_address(linkHref, linkText);
        }
    }

    private void getNews() throws IOException {
        String url = "https://www.haitou.cc/";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements elements = doc.getElementsByClass("top-recruit");
        Elements img = elements.select("img");
        System.out.println(img);
    }

    public void getPosition() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-21";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements elements = doc.getElementsByClass("second-positions");
        Elements a = elements.select("a");
        DB_table db_table = new DB_table();
        for (Element a1 : a) {
            String job = "服务/职能";
            String position = a1.text();
            System.out.println(job + position);
            db_table.setPosition(job, position);
        }
    }

    private void getAiqiyiSrc()throws IOException{
        String url = "http://m.iqiyi.com/v_19rreixzio.html";
        Connection conn = Jsoup.connect(url).timeout(10000).userAgent("Mozilla/5.0 (Windows NT 5.1; zh-CN) AppleWebKit/535.12 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/535.12").ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements video=doc.getElementsByClass("videoArea");
        System.out.println(video);
    }
}
