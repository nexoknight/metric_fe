const getTableData = (periods) => (
  periods.map(item => item.items.map(row => {
    return ({
      percentilLeadTime: item.percentilLeadTime,
      percentilBacklogTime: item.percentilBacklogTime,
      id: row.value[0].id,
      title: row.value[0].fields.Title,
      backlogTime: row.value[0].backlogTime,
      leadTime: row.value[0].leadTime,
      url: row.value[0].url,
      activatedDate: row.value[0].fields.ActivatedDate,
      createdDate: row.value[0].fields.CreatedDate,
      closedDate: row.value[0].fields.ClosedDate,
      areaPath: row.value[0].fields.AreaPath,
      assignedTo: row.value[0].fields.AssignedTo,
      iterationPath: row.value[0].fields.IterationPath,
      state: row.value[0].fields.State,
      workItemType: row.value[0].fields.WorkItemType
    })
  }))
)

export default getTableData
