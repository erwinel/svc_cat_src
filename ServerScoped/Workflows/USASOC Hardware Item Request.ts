/// <reference path="../types/service-now/index.d.ts" />
/// <reference path="../types/service-now/x_44813_usasoc_cst/index.d.ts" />

namespace usasoc_hardware_item_request {
    interface IRequestItemFields extends sc_req_itemFields {

    }
    declare interface HardwareRequestItemScratchPad {
        approveBy?: string;
    }
    declare type IRequestItemGlideRecord = sc_req_itemGlideRecord & IRequestItemFields;
    declare type HardwareRequestItemWorkflow = Omit<Workflow, "scratchpad"> & {
        scratchpad(): HardwareRequestItemScratchPad;
    }
    function is_initial_routing(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        var answer = (function (scratchpad: HardwareRequestItemScratchPad, context: wf_contextFields): 'yes' | 'no' {
            if (gs.nil(scratchpad.approveBy)) {
                workflow.debug('Getting schedule');
                var schedule: GlideSchedule = new GlideSchedule((<cmn_scheduleFields>context.schedule).sys_id);
                scratchpad.approveBy = schedule.add(new GlideDateTime(), new GlideDuration(259200000)).toString();
                workflow.debug("Setting approval deadline for " + scratchpad.approveBy);
                return 'yes';
            }
            (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
            return 'no';
        })(workflow.scratchpad(), <wf_contextFields>current.context);
    }
    function on_approval_subflow_return(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        workflow.debug('Approval occurred');
        workflow.scratchpad().approveBy = undefined;
    }
    function wait_approve_or_3_days(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        var answer;
        
        answer = (function (scratchpad: HardwareRequestItemScratchPad): 'yes' | 'no' {
            if (!gs.nil(scratchpad.approveBy)) {
                var approveBy = new GlideDateTime(scratchpad.approveBy);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad());
    }
    function check_approval_subflow_finished(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        var answer = gs.nil(workflow.scratchpad().approveBy);
    }
    function fallback_approvals(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        var answer: string[] = [];
        answer.push((new x_44813_usasoc_cst.USASOCCustomizations()).getDefaultScCatItemApprovalGroupSysId());
    }
    function isNotClosed(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow) {
        var answer = (function (scratchpad: HardwareRequestItemScratchPad): 'yes' | 'no' {
            var th: x_44813_usasoc_cst.TaskHelper = new x_44813_usasoc_cst.TaskHelper(current);
            if (th.isClosed())
                return 'no';
            if (th.isPending())
                th.setOpen();
            if (gs.nil(current.assignment_group) && gs.nil(current.assigned_to)) {
                var gr: sys_user_groupFields = <sys_user_groupFields>(<sc_cat_itemFields>current.cat_item).group;
                if (gs.nil(gr)) {
                    workflow.warn("Catalog item " + (<sc_cat_itemFields>current.cat_item).sys_id + " does not have an assignment group");
                    gr = <sys_user_groupFields>(new x_44813_usasoc_cst.USASOCCustomizations()).getDefaultScCatItemAssignmentGroup();
                    if (gs.nil(gr)) {
                        workflow.error("Failed to get default assignment group");
                        return 'yes';
                    }
                }
                current.assignment_group = <$$property.generic.Reference<sys_user_groupFields, sys_user_groupGlideRecord>>gr;
            }
            return 'yes';
        })(workflow.scratchpad());
    }
    function reset_state(current: IRequestItemGlideRecord, workflow: HardwareRequestItemWorkflow): void {
        workflow.scratchpad().approveBy = undefined;
        (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
    }
}