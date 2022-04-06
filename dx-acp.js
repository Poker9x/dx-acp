var DXacp = {
    init(ob) {
        var css = `
            .dx-acp {
                background: white
            }
            .dx-acp li {
                padding: 10px;
                border-top: 1px solid silver
            }
            .dx-acp li:hover{ background-color: rgb(218, 216, 216); }
        `;
        var style = document.createElement('style');

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);

        var input = document.querySelector(ob.input)
        var is = false

        if (typeof ob.data == 'string') {
            fetch(ob.data).then(res => res.json()).then(data => {
                this.app(ob, data, input, is)
            })
        } else {
            this.app(ob,ob.data,input,is)
        }
    },

    app(ob, data, input, is) {
        var ul = this.createList(data, ob, input)
        ul.style.display = "none"
        input.after(ul)

        input.oninput = e => {
            var value = e.target.value
            var arr = []
            data.map(v => {
                var val = typeof v == 'string' ? v : v[ob.key]
                if (this.convertViToEn(val.substr(0, value.length), true) == this.convertViToEn(value, true)) {
                    arr.push(v)
                }
            })
            ul.innerHTML = ''
            ul = this.createList(arr, ob, input)
            input.after(ul)
        }

        input.onclick = () => {
            is = !is
            if (is) ul.style.display = "block"
            else ul.style.display = "none"
        }
    },

    createList(data, ob, input) {
        var ul = document.createElement('ul')
        ul.className = 'dx-acp'

        data.map((v, k) => {
            var li = document.createElement('li')
            li.innerHTML = ob.template(v)

            li.onclick = () => {
                var val = typeof v == 'string' ? v : v[ob.key]
                input.value = val
                ob.select(v)
            }

            ul.appendChild(li)
        })
        return ul
    },

    convertViToEn(str, toUpperCase = false) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

        return toUpperCase ? str : str;
    }
}

window.DXacp = DXacp