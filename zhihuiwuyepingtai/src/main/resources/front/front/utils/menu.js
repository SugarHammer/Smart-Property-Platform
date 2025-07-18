const menu = {
    list() {
        return [
    {
        "backMenu":[
        ],
        "frontMenu":[
        ],
        "hasBackLogin":"是",
        "hasBackRegister":"否",
        "hasFrontLogin":"否",
        "hasFrontRegister":"否",
        "roleName":"管理员",
        "tableName":"users"
    },
    {
        "backMenu":[
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                            "新增",
                        ],
                        "menu":"报修",
                        "menuJump":"列表",
                        "tableName":"baoxiu"
                    }
                ],
                "menu":"报修"
            }
			,
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                        ],
                        "menu":"便民服务",
                        "menuJump":"列表",
                        "tableName":"bianmin"
                    }
                ],
                "menu":"便民服务"
            }
            ,
            {
                "child":[
                    {
						"appFrontIcon":"cuIcon-message",
                        "buttons":[
                            "查看"
                        ],
                        "menu":"投诉管理",
                        "menuJump":"列表",
                        "tableName":"chat"
                    }
                ],
                "menu":"投诉管理"
            }
			,
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                        ],
                        "menu":"车位",
                        "menuJump":"列表",
                        "tableName":"chewei"
                    }
                ],
                "menu":"车位"
            }
            ,
            {
                "child":[
                    {
						"appFrontIcon":"cuIcon-order",
                        "buttons":[
                            "查看",
                            "删除"
                        ],
                        "menu":"车位订单",
                        "menuJump":"列表",
                        "tableName":"cheweiOrder"
                    }
                ],
                "menu":"车位订单"
            }
			,
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                        ],
                        "menu":"房屋",
                        "menuJump":"列表",
                        "tableName":"fangwu"
                    }
                ],
                "menu":"房屋"
            }
			,
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                        ],
                        "menu":"公告",
                        "menuJump":"列表",
                        "tableName":"gonggao"
                    }
                ],
                "menu":"公告"
            }
			,
			{
                "child":[
                    {
						"appFrontIcon":"cuIcon-form",
                        "buttons":[
                            "查看",
                        ],
                        "menu":"缴费",
                        "menuJump":"列表",
                        "tableName":"jiaofei"
                    }
                ],
                "menu":"缴费"
            },
            {
                "child":[
                  
                    {
						"appFrontIcon":"cuIcon-list",
                        "buttons":[
                            "查看"
                        ],
                        "menu":"问卷调查",
                        "tableName":"exampaper"
                    }
                ],
                "menu":"问卷管理"
            }
        ],
        "frontMenu":[
        ],
        "hasBackLogin":"是",
        "hasBackRegister":"否",
        "hasFrontLogin":"是",
        "hasFrontRegister":"是",
        "roleName":"用户",
        "tableName":"yonghu"
    }
]

	}
}
export default menu;
