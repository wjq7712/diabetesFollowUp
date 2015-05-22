$(document).ready(function () {
    $("#diagnosis").find(".pre").hide(); //��ʼ��Ϊ��һ��
    var page = 1; //��ʼ����ǰ�İ���Ϊ1
    var $show = $("#diagnosis").find(".menubox"); //�ҵ�ͼƬչʾ����
    var page_count = $show.find("ul.qeslist").length;
    var $width_box = $show.parents("#querybox").width(); //�ҵ�ͼƬչʾ������Χ��di
    $("#diagnosis").find(".nav a:lt(1)").addClass("now").siblings("a").removeClass("now");
    function nav() {
        if (page == 1) {
            $("#diagnosis").find(".pre").hide().siblings(".next").show(); //siblings(selected)���ƥ�伯����ÿ��Ԫ�ص�ͬ��
        } else if (page == page_count) {
            $("#diagnosis").find(".next").hide().siblings(".pre").show();
        } else {
            $("#diagnosis").find(".pre").show().siblings(".next").show();
        }
    }

    $("#diagnosis").find(".next").click(function () {
        if (!$show.is(":animated")) {
            $show.animate({ left: '-=' + $width_box }, "normal");
            page++;
            nav();
            $number = page - 1;
            $("#diagnosis").find(".nav a:eq(" + $number + ")").addClass("now").siblings("a").removeClass("now");
            return false;
        };
    })

    $("#diagnosis").find(".pre").click(function () {
        if (!$show.is(":animated")) {
            $show.animate({ left: '+=' + $width_box }, "normal");
            page--;
            nav();
            $number = page - 1;
            $("#diagnosis").find(".nav a:eq(" + $number + ")").addClass("now").siblings("a").removeClass("now");
        }
        return false;
    })

    $("#diagnosis").find(".nav a").click(function () {
        $index = $(this).index();
        page = $index + 1;
        nav();
        $show.animate({ left: -($width_box * $index) }, "normal");
        $(this).addClass("now").siblings("a").removeClass("now");
        return false;
    })
    //�������븨����ϲ��� ��ǰ�����֪�������ʾ��table��
    $("#AuxiliaryDiagnosis").mouseenter(function () {
        var mmseval = ($("input[name='step']:checked").length);
        $("#SAD1").attr("value", mmseval);
        //�ʱ�ѧϰ
        var vl1 = $("#time1 input:checked").length;
        $("#SAD3").attr("value", vl1);
        var vl2 = $("#time2 input:checked").length;
        $("#SAD4").attr("value", vl2);
        var vl3 = $("#time3 input:checked").length;
        $("#SAD5").attr("value", vl3);
        var vl4 = $("#time4 input:checked").length;
        $("#SAD14").attr("value", vl4);

        //ͼ�μ��� Ϊ����ҳ�����ظ�����ͼ ������Ϊ0
        var A1 = $("#C3A").val();
        if (A1 == "") {
            A1 = 0; 
        }
        $("#SAD61").attr("value", A1);

        var A2 = $("#C3B").val();
        if (A2 == "") {
            A2 = 0;
        }
        $("#SAD62").attr("value", A2);



        var A3 = $("#C3C").val();
        if (A3 == "") {
            A3 = 0; 
        }
         $("#SAD63").attr("value", A3);
        
        //IADL
        var IADL = 0;
        var count = 0;
        $.each($('#IADL select option:selected'), function () {
            pm = $(this).val();
            count = parseInt(pm);
            IADL += count;
        });
        $("#SAD2").attr("value", IADL);

        //�ӿռ���ִ��������ע�⡢����������Ľ��
        if ($("#mt1").prop("checked"))
        { $("#SAD7").attr("value", "1"); }
        else $("#SAD7").attr("value", "0");
        if ($("#mt2").prop("checked"))
        { $("#SAD8").attr("value", "1"); }
        else $("#SAD8").attr("value", "0");
        var mt3 = ($("input[name='clock']:checked").length);
        $("#SAD9").attr("value", mt3);
        var mt4 = ($("input[name='animal']:checked").length);
        $("#SAD10").attr("value", mt4);
        var mt5 = ($("input[name='columns']:checked").length);
        $("#SAD11").attr("value", mt5);
        if ($("#mt6").prop("checked"))
        { $("#SAD12").attr("value", "1"); }
        else $("#SAD12").attr("value", "0");
        //ֻ�ܵ�ѡ
        var mt7 = 0;
        if ($("#calculate1").prop("checked"))
        { mt7 = 1; }
        else if ($("#calculate2").prop("checked"))
        { mt7 = 2; }
        else if ($("#calculate3").prop("checked"))
        { mt7 = 3; }
        else { mt7 = 0; }
        $("#SAD13").attr("value", mt7);
    });


    //    //�������
    //    $("#AuxiliaryDiagnosis").mouseenter(function () {
    //        $.ajax({
    //            url: '/Diagnosis/CDSSdiagnosis',
    //            type: 'GET',
    //            //            data: '@Model',
    //            dataType: 'json',
    //            async: false,
    //            cache: false,
    //            success: function (data) {
    //                var label = document.getElementById('sysdiagnosis').innerHTML = data[18];
    //            }
    //        });
    //    })

    //dropdownlist�����ݱ仯���¸����ܷ�
    $('.C3A select').change(function () {
        var pmall1 = 0;
        $.each($('.C3A select option:selected'), function () {
            pm = $(this).text();
            if (pm == "")
            { pm = "0"; }
            pmint = parseInt(pm);
            pmall1 += pmint;
        });
        $("#C3A").attr("value", pmall1);
    });

    $('.C3B select').change(function () {
        var pmall2 = 0;
        $.each($('.C3B select option:selected'), function () {
            pm = $(this).text();
            if (pm == "")
            { pm = "0"; }
            pmint = parseInt(pm);
            pmall2 += pmint;
        });
        $("#C3B").attr("value", pmall2);
    });

    $('.C3C select').change(function () {
        var pmall3 = 0;
        $.each($('.C3C select option:selected'), function () {
            pm = $(this).text();
            if (pm == "")
            { pm = "0"; }
            pmint = parseInt(pm);
            pmall3 += pmint;
        });
        $("#C3C").attr("value", pmall3);
    });

    //���һ��ʵ�ֵ�ѡ
    $("#calculate").find(".calculation").each(function () {
        $(this).click(function () {
            var currentState = $(this).prop("checked");
            if (this.checked) {
                $(this).parent("li").siblings().children(".calculation").each(function () {
                    if (currentState == this.checked) {
                        this.checked = false;
                    }
                })
            }
        })
    })
})
