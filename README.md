# Demo:
https://poker9x.github.io/dx-acp/

# Autocomplate Library
- Để sử dụng thư viện trước tiên cần import thư viện vào
```js
<script src="/dx-acp.js"></script>
```
- sau đó cấu hình như sau
```js
DXacp.init({
    input: 'search',
    data: ['nam','phong','duong','nu','dung'],
    key: 'name',
    template: v => `
        ${v}
    `,
    select: v => {
        console.log(v)
    }
})
```
## Trong đó
- 1: input: chính là id của input mà chúng ta muốn xử lý autocomplete
Ví dụ
```html
<input type='text' id='search'>
```
- 2: data: chính là dữ liệu cần đưa vào.
* : có thể là 1 mảng
```js
data: ['nam','phong','duong','nu','dung'],
```
* : có thể truyền vào 1 api mà trả về 1 chuỗi json
```js
data: 'api/posts.json'
```
- 3: truyền vào 1 key mà bạn cần so sánh nếu dữ liệu là 1 Array Object
ví dụ:
```js
data: [{
    id: 1,
    name: 'Nam'
},{
    id: 2,
    name: 'Hung'
}, ...],
key: 'name'
```
thì sẽ dùng key là name để so sánh
- 4: template dùng để custom template
```js
template: value => `
    // Biến value chính là element của array
    ID: ${value.id} - Name: ${value.name}
`
```
- 5: Hàm select sẽ trả về element khi bạn chọn 1 phần tử
```js
select: value => {
    console.log('Bạn đã chọn: ' + value.id)
}
```

### Thông Tin
- Name: DXacp.js
- Author: DuongX
- Version: 1.0.0
- Date: 04/06/2022
