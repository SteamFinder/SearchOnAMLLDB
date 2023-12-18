//预获取AMLL歌词数据库信息
//http://music.163.com/api/song/detail/?id=1296345669&ids=[1296345669]
console.log('[main]初始化');
console.log('\n' + ' %c Search On AMLL DB' + ' %c https://steamfinder.github.io/SearchOnAMLLDB ' + '\n', 'color: #fff; background: #030307; padding:5px 0;', 'background: #2fd160; padding:5px 0;');
//
var amll_data = [];
var ncm_data_name = [];
var current_name;
var current_singer;
var current_pic;
//
console.log('[main]从Github获取AMLL TTML DB数据库数据');
//
fetch('https://api.github.com/repos/Steve-xmh/amll-ttml-db/contents/lyrics')
    .then(response => response.json())
    .then(data => {
        // data 是包含文件和子文件夹信息的数组
        // 遍历数组并获取每个对象的 name 字段
        data.forEach(file => {
            console.log('[main]成功 从Github获取AMLL TTML DB数据库数据');
            const ttml_id = file.name.replace(/\.ttml$/, '');
            amll_data.push(ttml_id);
        });
        console.log('[main]获取到Github数据库数据, 分离.ttml后缀' + amll_data);
    });
//
console.log('[main]成功 存储Github数据库列表数据');
//
function fetchNcmData() {
    //
    console.log('[main]向页面写入TTML数据');
    //
    //取歌曲名
    //向网页写数据
    // 获取表格的 HTML 元素
    const table = document.getElementById('amll_data_list');
    const tbody = table.querySelector('tbody');
    // 清空内容
    console.log('[main]清除表格数据');
    tbody.innerHTML = '';
    console.log('[main]清除网易云查询数据');
    ncm_data_name = [];
    // 使用 for 循环遍历数组
    for (let i = 0; i < amll_data.length; i++) {
        // 创建表格行元素
        const row = document.createElement('tr');
        // 创建表格单元格元素
        const no = document.createElement('td');
        const id = document.createElement('td');
        const sname = document.createElement('td');
        const cbutton = document.createElement('td');
        const csinger = document.createElement('td');
        // 设置单元格的文本内容
        no.textContent = i + 1;
        id.textContent = amll_data[i];
        // sname.textContent = 'loading';
        sname.innerHTML = '<div class="spinner-grow spinner-grow-sm text-primary"></div>';
        sname.setAttribute('ncmname', i);
        cbutton.innerHTML = "<button type=\"button\" class=\"btn btn-outline-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#details\" onclick=\"fetchDetails(" + amll_data[i] + ")\">详情</button>";
        cbutton.setAttribute('ncmid', amll_data[i])
        csinger.innerHTML = '<div class="spinner-grow spinner-grow-sm text-primary"></div>';
        csinger.setAttribute('ncmsname', i)
        // 将单元格添加到行中
        row.appendChild(no);
        row.appendChild(id);
        row.appendChild(sname);
        row.appendChild(csinger);
        row.appendChild(cbutton);
        // 将行添加到表格的 tbody 中
        tbody.appendChild(row);
    }
    //
    console.log('[main]向页面写入网易云查询数据');
    //
    for (let i = 0; i < amll_data.length; i++) {
        // console.log(amll_data[i] + 'https://autumnfish.cn/song/detail?ids=' + amll_data[i]);
        //1296345669 1901371647 https://autumnfish.cn/song/detail?ids=1901371647
        fetch('https://autumnfish.cn/song/detail?ids=' + amll_data[i])
            .then(response => response.json())
            .then(data => {
                // 输出name字段
                var name = data.songs[0].name;
                var singername = data.songs[0].ar[0].name;
                // console.log('fetch:' + amll_data[i] + ' ' + name);
                ncm_data_name.push(name);
                console.log('[main]成功 存储网易云数据库列表数据');
                var tdElement = document.querySelector('td[ncmname=\'' + i + '\']');
                // 检查是否找到了元素
                if (tdElement) {
                    // 写入数据
                    tdElement.innerText = name;
                } else {
                    console.log('[main]Cannot get attribute <td> with ncmname');
                }
                var tdElement = document.querySelector('td[ncmsname=\'' + i + '\']');
                // 检查是否找到了元素
                if (tdElement) {
                    // 写入数据
                    tdElement.innerText = singername;
                } else {
                    console.log('[main]Cannot get attribute <td> with ncmsname');
                }
            });
    }
    //ncm_data_name
    console.log('[main]' + ncm_data_name);
    console.log('[main]成功 存储ncm_data_name');
    console.log('[main]成功 执行函数');
}

function fetchNcmDataByID() {
    const ncmIdValue = document.getElementById('ncm_id').value; //取值
    for (let i = 0; i < amll_data.length; i++) {
        if (ncmIdValue == amll_data[i]) {
            console.log('[fetchNcmDataByID]向页面写入网易云查询数据');
            //取歌曲名
            //向网页写数据
            // 获取表格的 HTML 元素
            const table = document.getElementById('amll_data_list');
            const tbody = table.querySelector('tbody');
            // 清空内容
            console.log('[fetchNcmDataByID]清除表格数据');
            tbody.innerHTML = '';
            console.log('[fetchNcmDataByID]清除网易云查询数据');
            ncm_data_name = [];
            // 创建表格行元素
            const row = document.createElement('tr');
            // 创建表格单元格元素
            const no = document.createElement('td');
            const id = document.createElement('td');
            const sname = document.createElement('td');
            const cbutton = document.createElement('td');
            const csinger = document.createElement('td');
            // 设置单元格的文本内容
            no.textContent = i + 1;
            id.textContent = amll_data[i];
            cbutton.innerHTML = "<button type=\"button\" class=\"btn btn-outline-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#details\" onclick=\"fetchDetails(" + amll_data[i] + ")\">详情</button>";
            cbutton.setAttribute('ncmid', amll_data[i])
            // sname.textContent = 'loading';
            sname.innerHTML = '<div class="spinner-grow spinner-grow-sm text-primary"></div>';
            sname.setAttribute('ncmname', i);
            csinger.innerHTML = '<div class="spinner-grow spinner-grow-sm text-primary"></div>';
            csinger.setAttribute('ncmsname', i)
            // 将单元格添加到行中
            row.appendChild(no);
            row.appendChild(id);
            row.appendChild(sname);
            row.appendChild(csinger);
            row.appendChild(cbutton);
            // 将行添加到表格的 tbody 中
            tbody.appendChild(row);
            fetch('https://autumnfish.cn/song/detail?ids=' + amll_data[i])
                .then(response => response.json())
                .then(data => {
                    // 输出name字段
                    var name = data.songs[0].name;
                    var singername = data.songs[0].ar[0].name;
                    // current_name = data.songs[0].name;
                    // current_singer = data.songs[0].ar.name;
                    // current_pic = data.songs[0].al.picUrl;
                    // console.log('fetch:' + amll_data[i] + ' ' + name);
                    ncm_data_name.push(name);
                    console.log('[fetchNcmDataByID]成功 从网易云数据库查询数据');
                    var tdElement = document.querySelector('td[ncmname=\'' + i + '\']');
                    // 检查是否找到了元素
                    if (tdElement) {
                        // 写入数据
                        tdElement.innerText = name;
                    } else {
                        console.log('[fetchNcmDataByID]Cannot get attribute <td> with ncmname');
                    }
                    var tdElement = document.querySelector('td[ncmsname=\'' + i + '\']');
                    // 检查是否找到了元素
                    if (tdElement) {
                        // 写入数据
                        tdElement.innerText = singername;
                    } else {
                        console.log('[fetchNcmDataByID]Cannot get attribute <td> with ncmsname');
                    }
                });
            //
            console.log('[fetchNcmDataByID]向页面写入ncm_name数据');
            break;
        }
    }
}

function fetchNcmDataByName() {
    // 清空内容
    const table = document.getElementById('amll_data_list');
    const tbody = table.querySelector('tbody');
    console.log('[fetchNcmDataByName]清除表格数据');
    tbody.innerHTML = '';
    console.log('[fetchNcmDataByName]清除网易云查询数据');
    ncm_data_name = [];
    var amll_id;
    var ncm_names = [];
    var ncm_ids;
    var ncm_ii;
    const ncmNameValue = document.getElementById('ncm_name').value; //取值
    fetch('https://api.github.com/repos/Steve-xmh/amll-ttml-db/contents/lyrics')
        .then(response => response.json())
        .then(data => {
            // data 是包含文件和子文件夹信息的数组
            // 遍历数组并获取每个对象的 name 字段
            let ii = 0;
            data.forEach(file => {
                console.log('[fetchNcmDataByName]成功 存储Github数据库列表数据');
                const ttml_id = file.name.replace(/\.ttml$/, '');
                // amll_data.push(ttml_id);
                // amll_data.push(ttml_id);
                fetch('https://autumnfish.cn/song/detail?ids=' + ttml_id)
                    .then(response => response.json())
                    .then(data => {
                        // 输出name字段
                        var ssname = data.songs[0].name;
                        var singername = data.songs[0].ar[0].name;
                        // current_name = data.songs[0].name;
                        // current_singer = data.songs[0].ar.name;
                        // current_pic = data.songs[0].al.picUrl;
                        // console.log('fetch:' + amll_data[i] + ' ' + name);
                        // ncm_names.push(name);
                        console.log('[fetchNcmDataByName]成功 存储网易云查询数据');
                        if (ncmNameValue == ssname) {
                            ncm_ids = ttml_id;
                            console.log('[fetchNcmDataByName]向页面写入ttml_id数据');
                            //取歌曲名
                            //向网页写数据
                            // 获取表格的 HTML 元素
                            const table = document.getElementById('amll_data_list');
                            const tbody = table.querySelector('tbody');
                            // 清空内容
                            // 创建表格行元素
                            const row = document.createElement('tr');
                            // 创建表格单元格元素
                            const no = document.createElement('td');
                            const id = document.createElement('td');
                            const sname = document.createElement('td');
                            const cbutton = document.createElement('td');
                            const csinger = document.createElement('td');
                            // 设置单元格的文本内容
                            no.textContent = ii + 1;
                            id.textContent = ncm_ids;
                            cbutton.innerHTML = "<button type=\"button\" class=\"btn btn-outline-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#details\" onclick=\"fetchDetails(" + ncm_ids + ")\">详情</button>";
                            cbutton.setAttribute('ncmid', ncm_ids)
                            // sname.textContent = 'loading';
                            sname.innerHTML = ssname;
                            // sname.setAttribute('ncmname', ncm_ii);
                            csinger.innerHTML = singername;
                            // csinger.setAttribute('ncmsname', ncm_ii)
                            // 将单元格添加到行中
                            row.appendChild(no);
                            row.appendChild(id);
                            row.appendChild(sname);
                            row.appendChild(csinger);
                            row.appendChild(cbutton);
                            // 将行添加到表格的 tbody 中
                            tbody.appendChild(row);
                            //
                            console.log('[fetchNcmDataByName]向页面写入ncm_name数据');
                            // ii++;
                        }
                        ii++;
                    });
                // ii++;
            });
        });
}

var ap;//父级作用域
function fetchDetails(ttml_id) {
    var music_id = ttml_id;
    var music_src;
    const details_title = document.getElementById('m-title');
    const details_body = document.getElementById('m-body');
    const details_footer = document.getElementById('m-footer');
    const details_pic = document.getElementById('m-pic');
    const details_singer = document.getElementById('m-singer');
    const details_name = document.getElementById('m-name');
    const details_audio = document.getElementById('m-audio');
    const details_links = document.getElementById('m-links');
    const details_2gh = document.getElementById('m-2gh');
    fetch('https://autumnfish.cn/song/detail?ids=' + music_id)
        .then(response => response.json())
        .then(data => {
            // 输出name字段
            current_name = data.songs[0].name;
            current_singer = data.songs[0].ar[0].name;
            current_pic = data.songs[0].al.picUrl;
            // console.log('fetch:' + amll_data[i] + ' ' + name);
            details_pic.innerHTML = "<img src=\" " + current_pic + "\" width=\"100vh\" />";
            details_singer.innerHTML = '歌手: ' + current_singer + '<br>歌曲ID: ' + music_id;
            details_name.innerHTML = '歌曲名: ' + current_name;
            details_2gh.innerHTML = '<button type=\"button\" class=\"btn btn-outline-primary btn-block\" onclick=\"window.location.href=\'https://github.com/Steve-xmh/amll-ttml-db/blob/main/lyrics/' + music_id + '.ttml\'\">Github歌词</button>';
            details_title.innerHTML = '歌曲详情 ' + current_name + ' ' + music_id;
        });
    // details_title.innerHTML = music_id;
    // details_body.innerHTML = music_id;
    // details_footer.innerHTML = music_id;
    fetch('https://autumnfish.cn/song/url/v1?id=' + music_id + '&level=standard')
        .then(response => response.json())
        .then(data => {
            // data 是包含文件和子文件夹信息的数组
            // 遍历数组并获取每个对象的 name 字段
            console.log('[fetchDetails]成功 获取音频数据');
            music_src = data.data[0].url;
            var updatedUrl = music_src.replace(/^http:/, "https:");
            console.log('[fetchDetails]成功 升级音频地址为https');
            //details_audio.innerHTML = '<audio src=\'' + music_src + '\' controls />'; APlayer代替
            details_links.innerHTML = '<button type=\"button\" class=\"btn btn-outline-success btn-block\" onclick=\"window.location.href=\'https://music.163.com/#/song?id=' + music_id + '\'\">网易云歌曲页面</button>';
            ap = new APlayer({
                container: document.getElementById('aplayer'),
                audio: [{
                    name: current_name,
                    artist: current_singer,
                    url: updatedUrl,
                    cover: current_pic
                }]
            });
        });
}

function shutAplayer() {
    ap.pause();
    //ap.destroy();
    ap = null;
    var delAP = document.getElementById('aplayer');
    delAP.innerHTML = '';
    //清理元素
    console.log("[shutAplayer]Destroy aplayer");
    //关闭模态框后销毁aplayer 将变量重新赋值为null，以便释放引用
}