<html>

<head>
    <style>
        
        @page pageNo {
            size: auto;
            odd-header-name: html_MyHeader;
            odd-footer-name: html_MyFooter;
        }

        div.pageNo {
            page-break-before: always;
            page: pageNo;
        }

    </style>
</head>

<body>
    

    <htmlpageheader name="MyHeader">
        <table width="100%"
            style="vertical-align: bottom; font-family: serif; font-size: 8pt; color: #000000; font-weight: bold; font-style: italic; border-bottom: 1px solid #000000;">
            <tr>
                <td width="50%"><image src="/layouts/System_logo1.png" class="img-thumbnail" style='border: 0px solid #dee2e6;
                    padding: 0px;
                    height: 80px;' alt="Responsive" /></td>
                {{-- <td width="50%" align="center" style="font-weight: bold; font-style: italic;"><img src="{{url('social.jpg')}}" class="img-thumbnail" style='border: 0px solid #e6dedf;
                    padding: 0px; float: right; height: 80px;' alt="Responsive" /></td> --}}
            </tr>
        </table>
         
    </htmlpageheader>

    <htmlpagefooter name="MyFooter">
        <table width="100%"
            style="vertical-align: bottom; font-family: serif; font-size: 8pt; color: #000000; font-weight: bold; font-style: italic; border-top: 1px solid #000000;">
            <tr>
                <td width="33%"><span style="font-weight: bold; font-style: italic;">My document</span></td>
                <td width="33%" align="center" style="font-weight: bold; font-style: italic;">{PAGENO}/{nbpg}</td>
                <td width="33%" style="text-align: right; ">{DATE j-m-Y}</td>
            </tr>
        </table>
    </htmlpagefooter>

    <div class="pageNo">Text of Chapter 2</div>

</body>

</html>
