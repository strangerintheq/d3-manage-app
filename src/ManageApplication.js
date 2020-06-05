// require('../../dependencies/bootstrap-4.0.0/css/bootstrap.min.css')
require('./manage-application.css');

var d3 = require('d3-selection');
var icons = require('./icons');
var Store = require('./Store');

class ManageApplication {
    constructor(properties) {

        let store = new Store(properties.key);
        let domElement = properties.domElement || document.body;

        var list;
        var currentPage = 1;
        var nextEmptyIndex;

        addEventListener('resize', function () {
            render(list)
        });

        window.managerApplication = {
            appName: 'pdf-editor-manage-app'
        };

        function load() {
            list = store.list();
            let count = 1;
            let NotEmpty = list.length > 0;
            let msg = d3.select('#msg')
                .classed('hidden', NotEmpty);
            if (NotEmpty) {
                count = list.length + 1;
            } else {
                msg.text('no records found');
            }
            render(list);
            nextEmptyIndex = count;
        }

        d3.select(domElement)
            .append('div')
            .classed('container', true)
            .attr('id', 'manage')
            .html(require('./html-template')(properties));

        d3.select('#button-clear')
            .on('click', store.clear);

        d3.select('#upload').on('change', function () {
            var file = d3.event.target.files[0];
            setTimeout(function () {
                var reader = new FileReader();
                reader.onload = function () {
                    store.import(reader.result)
                    load();
                };
                reader.readAsText(file);
            }, 10);
            d3.event.target.value = '';
            d3.event.target.type = '';
            d3.event.target.type = 'file';
        });

        d3.select('#button-new').on('click', function () {
            d3.select('#form-new').classed('hidden', false);
            d3.select('#form-list').classed('hidden', true);
            d3.select('#inputName').node().value = ''
        });

        d3.select('#button-create').on('click', function () {
            d3.select('#form-new').classed('hidden', true);
            d3.select('#form-list').classed('hidden', false);
            let d = {
                name: getValue('#inputName') || 'doc ' + nextEmptyIndex
            };
            store.save(d);
            load();
        });

        load();

        function getValue(selector) {
            return d3.select(selector).property("value")
        }

        function render(data) {
            list = data;
            var pageSize = Math.floor((window.innerHeight - 300) / 62);
            currentPage = Math.min(currentPage, Math.ceil(data.length/pageSize)+1)
            renderRows(paginate(data, pageSize, currentPage));
            renderPaginate(data, pageSize);
        }

        function renderRows(page) {
            d3.select('#buildings-list')
                .selectAll('li')
                .remove();

            var row = d3.select('#buildings-list')
                .classed('hidden', false)
                .selectAll('li')
                .data(page)
                .enter()
                .append('li')
                .classed('list-group-item list-group-item-action', true)
                .style('cursor', 'default')
                .on('click', function (d) {
                    properties.rowClickAction(d)
                });

            row.append('h4')
                .style('display', 'inline-block')
                .text(function (d) {
                    return d.name
                });

            row.append('span')
                .classed('small', true)
                .style('padding-left', '5px')
                .text(function (d) {
                    return '(' + d.id + ')'
                });

            var rowButtons = row.append('span')
                .classed('row-buttons', true);

            rowButton(rowButtons, function (id) {
                store.del(id);
                load();
            }, icons.trash('gray'));

            properties.rowButtons.forEach(button => {
                rowButton(rowButtons, button.action, button.icon);
            })
        }

        function paginate(array, pageSize, pageNumber) {
            return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        }

        function rowButton(rowButtons, type, ico) {
            rowButtons.append('span')
                .html(ico)
                .on('click', d => {
                    d3.event.stopPropagation();
                    type(d.id);
                });
        }

        function renderPaginate(data, pageSize) {
            var keys = Object.keys(data);

            if (keys.length > pageSize) {

                var li = d3.select('#pagination')
                    .selectAll('li')
                    .data(Array(Math.ceil(keys.length / pageSize)).fill(0).map((e,i) => i + 1));

                li.exit().remove();

                li.enter()
                    .append('li')
                    .classed('active', function (d) {
                        return d === 1;
                    })
                    .classed('page-item', true)
                    .append('a')
                    .classed('page-link', true)
                    .on('click', function (d) {
                        currentPage = d;
                        render(list);
                    })
                    .text(function (d) {
                        return d;
                    });

                li.classed('active', function (d) {
                    return d === currentPage;
                })

            } else {
                d3.select('#pagination').html('')
            }
        }
    }
}

window.ManageApplication = ManageApplication;