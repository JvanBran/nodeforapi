define({ "api": [
  {
    "type": "get",
    "url": "/v1/ues/:sn/rt-info",
    "title": "获取设备上报实时信息",
    "version": "1.0.0",
    "name": "GetUeRealTimeInfo",
    "group": "UE",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sn",
            "description": "<p>设备序列号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sn",
            "description": "<p>设备序列号</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>设备状态</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "soc",
            "description": "<p>电池电量百分比</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "voltage",
            "description": "<p>电池电压</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "current",
            "description": "<p>电池电流</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "temperature",
            "description": "<p>电池温度</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "reportTime",
            "description": "<p>上报时间(yyyy-MM-dd HH:mm:ss)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"sn\": \"P000000000\",\n  \"status\": 0,\n  \"soc\": 80,\n  \"voltage\": 60.0,\n  \"current\": 10.0,\n  \"temperature\": null,\n  \"reportTime\": \"2018-08-13 18:11:00\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/login.js",
    "groupTitle": "UE"
  }
] });
