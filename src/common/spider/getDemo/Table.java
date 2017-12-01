package common.spider.getDemo;

import common.spider.insertDB.DB_table;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class Table {
    public static void main(String args[]) throws IOException{
        Table table =new Table();
        table.getNews();
    }

    public void school_rercuit() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-1";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements table=doc.getElementsByClass("table");
        Elements tbody=table.select("tbody");
        Elements trs=tbody.select("tr");
        for (Element tr:trs){
            String company=tr.getElementsByClass("company").text();
            String position="";
            Elements spans=tr.getElementsByClass("cxxt-position").select("span");
            for (Element span:spans){
                position+=span.text()+",";
            }
            Elements text_ellipsis=tr.getElementsByClass("text-ellipsis").select("span");
            String address=text_ellipsis.attr("title");
            String time=tr.getElementsByClass("cxxt-time").text();
            DB_table insert=new DB_table();
            insert.school_rercuit(company,position,address,time);

        }
    }
    public void filter_job() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-1";
        Connection conn = Jsoup.connect(url).timeout(3000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Element filter_content=doc.getElementsByClass("filter-content").first();
        Elements a =filter_content.getElementsByTag("a");
        for (Element item:a){
            String linkhref=item.attr("href");
            String linktext=item.text();
            DB_table filter=new DB_table();
            filter.filter_job(linkhref,linktext);
        }
        }
    public void filter_address() throws IOException {
        String url = "https://xyzp.haitou.cc/trade-1";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Element filter_content=doc.getElementsByClass("filter-content").last();
        Elements a=filter_content.getElementsByTag("a");
        for (Element item:a){
            String linkHref=item.attr("href");
            linkHref=linkHref.replace("/trade-1","");
            String linkText=item.text();
            DB_table filter=new DB_table();
            filter.filter_address(linkHref,linkText);
        }
    }
    public void getNews() throws IOException {
        String url = "https://www.haitou.cc/";
        Connection conn = Jsoup.connect(url).timeout(10000).ignoreContentType(true); // 建立与url中页面的连接
        Document doc = Jsoup.parse(conn.get().toString()); // 解析页面
        Elements elements=doc.getElementsByClass("top-recruit");
        Elements img =elements.select("img");
       System.out.println(img);
    }
    }
