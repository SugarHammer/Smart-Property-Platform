package com.dao;

import com.entity.ExampaperEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.entity.view.ExampaperView;

/**
 * 问卷 Dao 接口
 *
 * @author 
 */
public interface ExampaperDao extends BaseMapper<ExampaperEntity> {

   List<ExampaperView> selectListView(Pagination page,@Param("params")Map<String,Object> params);

}
