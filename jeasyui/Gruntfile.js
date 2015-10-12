module.exports = function(grunt) {
    var deps = ["jquery.panel.js", "jquery.parser.js", "jquery.accordion.js", "jquery.linkbutton.js", "jquery.tooltip.js", "jquery.validatebox.js", "jquery.textbox.js", "jquery.combo.js", "jquery.combobox.js", "jquery.draggable.js", "jquery.droppable.js", "jquery.tree.js", "jquery.combotree.js", "jquery.resizable.js", "jquery.pagination.js", "jquery.datagrid.js", "jquery.calendar.js", "jquery.datebox.js", "jquery.spinner.js", "jquery.timespinner.js", "jquery.datetimebox.js", "jquery.window.js", "jquery.dialog.js", "jquery.form.js", "jquery.menu.js", "jquery.menubutton.js", "jquery.progressbar.js", "jquery.messager.js", "jquery.numberbox.js", "jquery.numberspinner.js", "jquery.propertygrid.js", "jquery.tabs.js", "jquery.treegrid.js"];
    var version = "1.4.3";
    var jversion = "1.11.3";
    var srcs = (function(){
        var re = ["jquery/jquery-" + jversion + ".js"];
        for(var i=0,ii=deps.length;i<ii;i++){
            re.push("easyui/" + version + "/plugins/" + deps[i]);
        }
        re.push("easyui/" + version + "/easyui-lang-zh_CN.js");
        return re;
    })();
    var destFolder = 'dest' + version + '-' + jversion;
    grunt.initConfig({
        concat: {
            options: {
                separator: '\n',
            },
            jeasyui : {
                src: srcs,
                dest: destFolder + '/jeasyui.js',
            }
        },
        uglify : {
            jeasyui : {
                files: [{
                    src: destFolder + "/jeasyui.js",
                    dest: destFolder + "/jeasyui.min.js",
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('jeasyui', ['concat:jeasyui',"uglify:jeasyui"]);
};