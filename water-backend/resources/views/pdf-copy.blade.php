<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel 7 PDF Example</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css" />
    <style>
    @page {
        header: page-header;
        footer: page-footer;
    }

    </style>
</head>

<body>
    <htmlpageheader name="page-header">
        <div class="header-info">
            <div class="row mb-3" style='border-bottom: 1px solid; padding-top: 20px;'>
                <div class="col-md-12 mb-2" style='padding-bottom: 10px;'>
                    <img src="{{URL::asset('layouts/System_logo1.png')}}" class="img-thumbnail" style='border: 0px solid #dee2e6;
            padding: 0px;
            height: 80px;' alt="Responsive" />

                    <div style="float: right; display: inline-block;"><span>
                            <div role="group" class="btn-group-vertical"><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                    tabindex="0" type="button"><span class="MuiButton-label"><i
                                            class="zmdi zmdi-email zmdi-hc-fw "></i></span><span
                                        class="MuiTouchRipple-root"></span></button><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                    tabindex="0" type="button"><span class="MuiButton-label"><i
                                            class="zmdi zmdi-phone zmdi-hc-fw "></i></span><span
                                        class="MuiTouchRipple-root"></span></button><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                    tabindex="0" type="button"><span class="MuiButton-label"><i
                                            class="zmdi zmdi-pin zmdi-hc-fw"></i></span><span
                                        class="MuiTouchRipple-root"></span></button></div>
                        </span><span>
                            <div role="group" class="header-info btn-group-vertical"><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                    tabindex="0" type="button"><span
                                        class="MuiButton-label">info@awm.solar</span><span
                                        class="MuiTouchRipple-root"></span></button><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                    tabindex="0" type="button"><span class="MuiButton-label">+93
                                        790303132</span><span
                                        class="MuiTouchRipple-root"></span></button><button
                                    class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                    tabindex="0" type="button"><span
                                        class="MuiButton-label">Kabul-Afghanistan</span><span
                                        class="MuiTouchRipple-root"></span></button></div>
                        </span></div>
                </div>
            </div>
            <div style='width: 20%; display: inline-block;'>
                Project Name:
            </div>
            <div style='display: inline-block;'>
                {{ $data['project'][0]->name }}
            </div>
            <Divider class="mb-3 mt-3" />
        </div>
    </htmlpageheader>
    
    <htmlpagefooter name="page-footer">
        <div class="footer-info" style='padding-bottom: 30px'>
            <Divider class="mb-2 mt-2" />
            <div style='float: left; display: inline-block;'>
                Created by: AWM Solar Water Pumping System Planner
            </div>
            <div id="page-number" style='float: right; display: inline-block;'>
                Water Is Life
            </div>
        </div>
    </htmlpagefooter>
    <div class="container mt-5">
        <h2 class="text-center mb-3">Laravel HTML to PDF Example</h2>

        <div class="d-flex justify-content-end mb-4">
            <a class="btn btn-primary" href="{{ URL::to('/createPdf/209') }}">Export to PDF</a>
        </div>

        <section>
            <table class="report-container darkmodeColor" style='width: 100%;'>
                <thead class="report-header">
                    <tr>
                        <th class="report-header-cell">
                            <div class="header-info">
                                <div class="row mb-3" style='border-bottom: 1px solid; padding-top: 20px;'>
                                    <div class="col-md-12 mb-2" style='padding-bottom: 10px;'>
                                        <img src="{{URL::asset('layouts/System_logo1.png')}}" class="img-thumbnail" style='border: 0px solid #dee2e6;
                                padding: 0px;
                                height: 80px;' alt="Responsive" />

                                        <div style="float: right; display: inline-block;"><span>
                                                <div role="group" class="btn-group-vertical"><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                                        tabindex="0" type="button"><span class="MuiButton-label"><i
                                                                class="zmdi zmdi-email zmdi-hc-fw "></i></span><span
                                                            class="MuiTouchRipple-root"></span></button><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                                        tabindex="0" type="button"><span class="MuiButton-label"><i
                                                                class="zmdi zmdi-phone zmdi-hc-fw "></i></span><span
                                                            class="MuiTouchRipple-root"></span></button><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn"
                                                        tabindex="0" type="button"><span class="MuiButton-label"><i
                                                                class="zmdi zmdi-pin zmdi-hc-fw"></i></span><span
                                                            class="MuiTouchRipple-root"></span></button></div>
                                            </span><span>
                                                <div role="group" class="header-info btn-group-vertical"><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                                        tabindex="0" type="button"><span
                                                            class="MuiButton-label">info@awm.solar</span><span
                                                            class="MuiTouchRipple-root"></span></button><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                                        tabindex="0" type="button"><span class="MuiButton-label">+93
                                                            790303132</span><span
                                                            class="MuiTouchRipple-root"></span></button><button
                                                        class="MuiButtonBase-root MuiButton-root MuiButton-text jr-btn makeStyles-btnJr-47"
                                                        tabindex="0" type="button"><span
                                                            class="MuiButton-label">Kabul-Afghanistan</span><span
                                                            class="MuiTouchRipple-root"></span></button></div>
                                            </span></div>
                                    </div>
                                </div>
                                <div style='width: 20%; display: inline-block;'>
                                    Project Name:
                                </div>
                                <div style='display: inline-block;'>
                                    {{ $data['project'][0]->name }}
                                </div>
                                <Divider class="mb-3 mt-3" />
                            </div>

                        </th>
                    </tr>
                </thead>
                <tfoot class="report-footer">
                    <tr>
                        <td class="report-footer-cell">
                            <div class="footer-info" style='padding-bottom: 30px'>
                                <Divider class="mb-2 mt-2" />
                                <div style='float: left; display: inline-block;'>
                                    Created by: AWM Solar Water Pumping System Planner
                                </div>
                                <div id="page-number" style='float: right; display: inline-block;'>
                                    Water Is Life
                                </div>
                            </div>

                        </td>
                    </tr>
                    <span></span>
                </tfoot>
                <tbody class="report-content">
                    <tr class="page">
                        <td class="report-content-cell">
                            <div class='main'>
                                <div class="table-responsive-material mb-5">
                                    <Table class="default-table table-unbordered table table-sm table-hover">
                                        <thead class="table-head-sm th-border-b">
                                            <tr class='headTr'>
                                                <th>Input Summary</th>
                                                <th style='text-align: right'>
                                                    {{ $data['project'][0]->projectDate }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style='width: 20%;'>Location:</td>
                                                <td>
                                                    {{ $data['project'][0]->geolocation->country }},
                                                    {{ $data['project'][0]->geolocation->city }}({{ $data['project'][0]->geolocation->latitude }}°,
                                                    {{ $data['project'][0]->geolocation->longtitude }}°)
                                                </td>
                                            </tr>
                                            @if ($data['project'][0]->latitude && $data['project'][0]->longtitude) 
                                                <tr>
                                                    <td>GPS:</td>
                                                    <td>
                                                        {{ $data['project'][0]->latitude }}°, {{ $data['project'][0]->longtitude }}°
                                                    </td>
                                                </tr>
                                                @endif

                                                <tr>
                                                    <td>Designer:</td>
                                                    <td>
                                                        {{ $data['project'][0]->user->name }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Avg. Hourly water:</td>
                                                    <td>
                                                        {{ $data['project'][0]->daily_output }} (m³/h) @if ($data['project'][0]->daily_output_lable != 'm³/h' && $data['project'][0]->daily_output_lable != null)
                                                             {{ $data['project'][0]->daily_output_changed }}
                                                            ({{ $data['project'][0]->daily_output_lable }}) @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Avg. Daily water:</td>
                                                    <td>
                                                        {{ $data['energyWithOutPut']['monthlyAvaOfOut'] }}(m³/d)
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Total Dynamic head:</td>
                                                    <td>{{ $data['project'][0]->daynomic_head }}(m)</td>
                                                </tr>
                                                <tr>
                                                    <td>Pipe Friction losses:</td>
                                                    <td>
                                                        {{ ceil((int)(($data['project'][0]->dirt_loss * $data['project'][0]->pip_length) / 100)) }}
                                                        m (
                                                        {{ $data['project'][0]->dirt_loss }}
                                                        %)
                                                    </td>
                                                </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div class="table-responsive-material mb-5">
                                    <Table class="default-table table-unbordered table table-sm table-hover">
                                        <thead class="table-head-sm th-border-b">
                                            <tr class='headTr'>
                                                <th>Main Products</th>
                                                <th>Description</th>
                                                <th>Unite</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style='width: 20%;'>Solar</td>
                                                <td style='width: 60%;'>
                                                    {{ $data['solarbrand']['name'] }}
                                                    {{ $data['solarList']->solarListWithCable['power'] }}W
                                                    {{ $data['solarList']->solarListWithCable['type'] }} crystalline
                                                    {{ $data['solarList']->solarListWithCable['voltage'] }}V
                                                    {{ $data['solarList']->solarListWithCable['current'] }}A
                                                </td>
                                                <td style='width: 10%;'>panel</td>
                                                <td style='width: 10%;'>
                                                    {{ $data['solarList']->solar_quantity }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Pump</td>
                                                <td>
                                                    {{ $data['pupm'][0]->pump_brand->name }}{{ $data['pupm'][0]->model }}
                                                    {{ $data['pupm'][0]->hp }}HP {{ $data['pupm'][0]->power }}Kw
                                                    {{ $data['pupm'][0]->voltage }}V</td>
                                                <td>pc</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>Controller</td>
                                                <td>
                                                    {{ $data['inverter']->invertor_brand->name }} {{ $data['inverter']->power }}kw
                                                    {{ $data['inverter']->voltage }}V
                                                </td>
                                                <td>pc</td>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <td>Structure</td>
                                                <td>{{ $data['solarList']->base }}</td>
                                                <td>set</td>
                                                <td>
                                                    {{ $data['solarList']->panal_quantity }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Motor Cable</td>
                                                <td>{{ $data['cable']->name }}</td>
                                                <td>m</td>
                                                <td>
                                                    {{ ceil((int)($data['project'][0]->motor_cable)) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Solar Cable</td>
                                                <td>
                                                    {{ $data['solarList']->solarListWithCable->cable->name }}
                                                </td>
                                                <td>m</td>
                                                <td>
                                                    {{ $data['project'][0]->solar_cable }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Pipline</td>
                                                <td>polyeithline 2inch </td>
                                                <td>m</td>
                                                <td>
                                                    {{ $data['project'][0]->pip_length }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div class="table-responsive-material mb-5 accessory-sect">
                                    <Table class="default-table table-unbordered table table-sm table-hover">
                                        <thead class="table-head-sm th-border-b">
                                            <tr class='headTr'>
                                                <th>Accessories</th>
                                                <th>Description</th>
                                                <th>Unite</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @foreach ($data['projectAccessories'] as $data['projectAccessories'])
                                                <tr key={index}>
                                                    <td style='width: 20%;'>
                                                        {{ $data['projectAccessories']->accessoriesListWithUom->name }}
                                                    </td>
                                                    <td style='width: 60%;'>
                                                        {{ $data['projectAccessories']->accessoriesListWithUom->model }}
                                                    </td>
                                                    <td style='width: 10%;'>
                                                        {{ $data['projectAccessories']->accessoriesListWithUom->uom->acronym }}
                                                    </td>
                                                    <td style='width: 10%;'>
                                                        {{ $data['projectAccessories']->quantity }}
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr class="page">
                        <td class="report-content-cell">
                            <div class='main'>
                                <div class="row">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 col-xs-12">
                                        <section class="mt-5">
                                            <div class="wrapper wrapperOut">
                                                <h3>Output [m³]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Daily Average output/month
                                                    </h4>

                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div class="wrapper wrapperOut">
                                                <h3>Output [m³]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Hourly Output
                                                    </h4>

                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div class="wrapper wrapperIr">
                                                <h3>Irradiation [kwh/m2]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Irradiation value in deferent months of
                                                        year
                                                    </h4>

                                                </div>
                                            </div>
                                            <div class="wrapper wrapperIr">
                                                <h3>Irradiation [kwh/m2]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Hourly Values
                                                    </h4>

                                                </div>
                                            </div>
                                        </section>
                                        <section>
                                            <div class="wrapper wrapperEn">
                                                <h3>Energy [kwh]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Energy value in deferent months of year
                                                    </h4>

                                                </div>
                                            </div>
                                            <div class="wrapper wrapperEn">
                                                <h3>Energy [kwh]</h3>
                                                <div class="content">
                                                    <h4 style='text-align: center;'>
                                                        Hourly Values
                                                    </h4>

                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr class="page">
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Submersible pump specification:</caption>
                                <tr>
                                    <td style='width: 30%;'>
                                        <div class="table-responsive-material ">
                                            <Table class="default-table table-unbordered table table-sm table-hover">
                                                <thead class="table-head-sm th-border-b"></thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Brand:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->pump_brand->name }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model:</td>
                                                        <td>{{ $data['pupm'][0]->model }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Power:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->power }}Kw
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hors power:</td>
                                                        <td>{{ $data['pupm'][0]->hp }}HP</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Current:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->ampeier }}A
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Voltage:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->voltage }}V
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Outlet:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->outlet }}inch
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Diameter:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->diameter }}inch
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->weight }}kg
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Made in:</td>
                                                        <td>
                                                            {{ $data['pupm'][0]->pump_brand->country }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td style='width: 60%;'>
                                        @if ($data['pupm'][0]->graph)
                                            <img src={{ URL::asset('brand/pumpbrand/pump_list/graph/' . $data['pupm'][0]->graph) }}
                                                class="img-thumbnail pump-graph"
                                                style='border: 0px solid #dee2e6; padding: 0px;' alt="Responsive" />
                                        @endif
                                    </td>
                                    <td>
                                        @if ($data['pupm'][0]->image)
                                            <img src={{ URL::asset('brand/pumpbrand/pump_list/' . $data['pupm'][0]->image) }}
                                                class="img-thumbnail"
                                                style='border: 0px solid #dee2e6; padding: 0px; maxHeight: 460px;'
                                                alt="Responsive" />
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <div class='pump-diameter'>
                                            @if ($data['pupm'][0]->diameter_file)
                                                <img src={{ URL::asset('brand/pumpbrand/pump_list/diameter/' . $data['pupm'][0]->diameter_file) }}
                                                    class="img-thumbnail pump-diameter"
                                                    style='border: 0px solid #dee2e6; padding: 0px; padding-top: 30px;'
                                                    alt="Responsive" />
                                            @endif
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr class="page">
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Solar specification:</caption>
                                <tr>
                                    <td style='width: 60%;'>
                                        <div class="table-responsive-material">
                                            <Table class="default-table table-unbordered table table-sm table-hover">

                                                <tbody>
                                                    <tr>
                                                        <td style="width: 60%;">Brand:</td>
                                                        <td>
                                                            {{ $data['solarbrand']['name'] }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model:</td>
                                                        <td>
                                                            {{ $data['solarList']->solarListWithCable->model }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Rated Maximum power (Pmax):</td>
                                                        <td>270Wp</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Voltage at Maximum power(Vmp):</td>
                                                        <td>31.3V</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Current at Maximum power(Imp):</td>
                                                        <td>8.79A</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Open Circuit Voltage(VOC):</td>
                                                        <td>38.4V</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Short Circuit Current (Isc):</td>
                                                        <td>9.31A</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Mazimum System Voltage:</td>
                                                        <td>1000V</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Size (mm):</td>
                                                        <td>1648*995*35mm</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight:</td>
                                                        <td>18kg</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td>
                                        @if ($data['solarList']->solarListWithCable->image)
                                            <img src={{ URL::asset('brand/solar/solar_list/' . $data['solarList']->solarListWithCable->image) }}
                                                class="img-thumbnail solar-image"
                                                style='border: 0px solid #dee2e6; padding: 0px; float: right;'
                                                alt="Responsive" />
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <div class='solar-diameter'>
                                            @if ($data['solarList']->solarListWithCable->diameter)
                                                <img src={{ URL::asset('brand/solar/solar_list/diameter/' . $data['solarList']->solarListWithCable->diameter) }}
                                                    class="img-thumbnail solar-diamention"
                                                    style='border: 0px solid #dee2e6; padding: 0px;' alt="Responsive" />
                                            @endif
                                        </div>
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr class="page">
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Controller specification:</caption>
                                <tr>
                                    <td style='width: 70%;'>
                                        <div class="table-responsive-material ">
                                            <Table class="default-table table-unbordered table table-sm table-hover">
                                                <tbody>
                                                    <tr>
                                                        <td style="width: 32%;">Brand:</td>
                                                        <td>
                                                            {{ $data['inverter']->invertor_brand->name }}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Model:</td>
                                                        <td>{{ $data['inverter']->model }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Power:</td>
                                                        <td>
                                                            {{ $data['inverter']->power }}Kw
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hors power:</td>
                                                        <td>5.5HP</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Current:</td>
                                                        <td>
                                                            {{ $data['inverter']->current }}A
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Voltage:</td>
                                                        <td>
                                                            {{ $data['inverter']->voltage }}V
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Weight:</td>
                                                        <td>26kg</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Made in:</td>
                                                        <td>
                                                            {{ $data['inverter']->invertor_brand->country }}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </td>
                                    <td>
                                        @if ($data['inverter']->image)
                                            <img src={{ URL::asset('brand/invertor/invertor_list/' . $data['inverter']->image) }}
                                                class="img-thumbnail invertor-image"
                                                style='border: 0px solid #dee2e6; padding: 0px;' alt="Responsive" />
                                        @endif
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2' style='text-align: center;' class='controller-diameter'>
                                        @if ($data['inverter']->diameter)
                                            <img src={{ URL::asset('brand/invertor/invertor_list/diameter/' . $data['inverter']->diameter) }}
                                                class="img-thumbnail invertor-diamention"
                                                style='border: 0px solid #dee2e6; padding: 0px;' alt="Responsive" />
                                        @endif
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                    <p class="pageNo"></p>

                    <tr class="page">
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Strucuter specification:</caption>
                                <tr>
                                    <td style='width: 40%;'>
                                        Brand:
                                    </td>
                                    <td>
                                        No
                                    </td>
                                </tr>
                                <tr>
                                    <td style='width: 40%;'>
                                        Model:
                                    </td>
                                    <td>
                                        {{ $data['project'][0]->solar_base }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Capacity:</td>
                                    <td>4/6/8/10/12 panels</td>
                                </tr>
                                <tr>
                                    <td colSpan='2' style='text-align: center;'>
                                        <img src={{ URL::asset('structure/' . $data['structure']->image) }}
                                            class="img-thumbnail structure-img" style='border: 0px solid #dee2e6;'
                                            alt="Responsive" />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <h4>Note: Image may be deferent with actual product as this is a graphic design.
                                        </h4>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <p class="pageNo"></p>

                    <tr class="page">
                        <td class="report-content-cell ">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Wiring Diagram</caption>
                                <tr>
                                    <td style='text-align:center;'>
                                        @if ($data['solarList']->image)
                                            <img src={{ URL::asset('brand/solar/solar_list/config/' . $data['solarList']->image) }}
                                                class="img-thumbnail wiring-img" style='border: none;'
                                                alt="Responsive" />
                                        @endif
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr class="page">
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>System General layout</caption>
                                <tr>
                                    <td colSpan='2'>
                                        <img src={{ URL::asset('/layouts/system-layout-with-details1.jpg') }}
                                            class="img-thumbnail  genral-layout-img" style='border: none;'
                                            alt="Responsive" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 50%;">
                                        <h5>1- Solar panels</h5>
                                    </td>
                                    <td style="width: 50%;">
                                        <h5>9- Garden</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>2- Pump controller</h5>
                                    </td>
                                    <td>
                                        <h5>10- Swimming pool</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>3- Submersible</h5>
                                    </td>
                                    <td>
                                        <h5>11- Water reservoir</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>4- well probe sensors</h5>
                                    </td>
                                    <td>
                                        <h5>12- Flaut switch</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>5- Pump electrical cable</h5>
                                    </td>
                                    <td>
                                        <h5>13- Flaut switch Ele. cable</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>6- Non return valve</h5>
                                    </td>
                                    <td>
                                        <h5>14- Residential Houses</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>7- Pressure Gauge</h5>
                                    </td>
                                    <td>
                                        <h5>15- Toilet</h5>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h5>8- Water meter</h5>
                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <p class="pageNo"></p>
                    <tr>
                        <td class="report-content-cell">
                            <table style='width:100%;' class="inside-table-pump">
                                <caption>Sizing layout</caption>
                                <tr>
                                    <td>
                                        <img src="{{ URL::asset('/layouts/layoutdetails1.jpg') }}"
                                            class="img-thumbnail sizing-img" style='border: none;' alt="Responsive" />

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <p class="pageNo"></p>

                </tbody>
            </table>
        </section>
    </div>

    <script src="{{ URL::asset('js/app.js') }}" type="text/js"></script>
</body>

</html>
