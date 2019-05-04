<template>
  <el-row id="Footer">
    <el-col :span="6">
      <address class="center">
        Written by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/MYunFeiYang/Network_recuiting_system"
        >think道</a>
        <br>Visit me at:
        <br>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/MYunFeiYang/Network_recuiting_system"
        >MYunFeiYang</a>
        <br>
      </address>
    </el-col>
    <el-col :span="6">
      <address class="center">
        网站运营：
        <br>
        <a target="_blank" rel="noopener noreferrer" href="http://tool.chinaz.com/">站长工具</a>
        <br>
        <a target="_blank" rel="noopener noreferrer" href="http://union.baidu.com/">百度联盟</a>
        <br>
      </address>
    </el-col>
    <el-col :span="6">
      <address class="center">
        项目部署：
        <br>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com/">阿里云计算</a>
        <br>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.miitbeian.gov.cn/"
        >鄂ICP备17029283号</a>
        <br>
      </address>
    </el-col>
    <el-col :span="6">
      <address class="center">
        友情链接：
        <br>
        <a target="_blank" rel="noopener noreferrer" href="http://v3.bootcss.com/">bootstrap中文网</a>
        <br>
        <a target="_blank" rel="noopener noreferrer" href="http://glyphicons.com/">Halflings字体图标</a>
        <br>
      </address>
    </el-col>
  </el-row>
</template>
<script>
export default {
    name:'Footer',
}
</script>
<style scoped>
#Footer{
    padding:20px;
    background-color: rgba(0,0,0,.3)
}
.center{
    text-align: center;
}
a{
    text-decoration: none
}
</style>


