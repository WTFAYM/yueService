# express+mysql

#### **说明**
该项目由于时间紧迫，毕竟毕业要紧，可能存在许多问题。后续有时间再进行优化修复。

#### 待添加模块
1. 日志模块
2. 用户模块

#### 使用环境
- node版本 8.10.0
- mysql

#### 代码生成器的使用
代码生成器能够为模块生成基础代码，代码位于根目录下的generator目录下，具体运行方式如下：
1. 打开该目录下的generator.js文件，修改位于最下方的代码
generate('Product', 'product');
2. node generator/generator运行

#### 目录说明
app目录是与业务有关的代码.....

项目采用MVC模式，在代码组织上采用三层架构划分，
分为Dao（数据访问层）、Service（业务逻辑层，用于处理业务逻辑），
Controller（控制层，用于对数据进行校验等操作）先省略……。接着还需配置对外的接口，配置文件位于
app的routes目录下。

建议一个模块分别一个controller、service、dao、route。


##### Dao
创建的dao需要继承BaseDao，BaseDao中已实现多个方法，可查看具体实现，BaseDao构造函数接收一个option参数，option可配置项如下：
<table>
<tr>
<th>参数名</th>
<th>类型</th>
<th>解释</th>
</tr>
<tr>
<td>tableName</td>
<td>string</td>
<td>该Dao中直接操作数据所对应的表名</td>
</tr>
<tr>
<td>primaryKey</td>
<td>string</td>
<td>表中的主键名。默认为id</td>
</tr>
<tr>
<td>autoPK</td>
<td>bool</td>
<td>是否为自增主键，如果为false则使用uuid填充。默认为false</td>
</tr>
</table>

##### Service
创建的service需继承BaseService，BaseService构造函数需要传入对应的dao名称。