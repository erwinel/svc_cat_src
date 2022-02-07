/// <reference path="../types/index.d.ts" />
/// <reference path="../UsasocScCatItem.ts" />

/**
 * USASOC Hardware Item Request
 * @namespace usasoc_hardware_item_request
 */
namespace usasoc_hardware_item_request {
    // Is default approval group
    function is_default_approval_group(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer;

        answer = ifScript();

        function ifScript() {
            var th: x_44813_usasoc_cst.TaskHelper = new x_44813_usasoc_cst.TaskHelper(current);
            var group: sys_user_groupFields = th.getDefaultApprovalGroupByCallerLocation();
            if (gs.nil(group)) {
                group = UsasocScCatItem.getDefaultScCatItemApprovalGroup();
                if (gs.nil(group))
                    gs.addInfoMessage("Warning! An internal error occured while setting up request approvals. Please refer this message to the ServiceNow administrator." +
                        "\n<br />Timestamp: " + (new GlideDateTime()).getInternalFormattedLocalTime() + "; Number: " + current.number);
                else
                    workflow.scratchpad.approval_group = <string>group.sys_id;

            }
            if (group.sys_id == UsasocScCatItem.getDefaultScCatItemApprovalGroupSysId()) {
                return 'yes';
            }
            return 'no';
        }
    }
    function is_initial_routing(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer = (function (scratchpad: UsasocHwRequestItemScratchPad, context: wf_contextElement): 'yes' | 'no' {
            if (gs.nil(scratchpad.approval_deadline)) {
                workflow.debug('Getting schedule');
                var schedule: GlideSchedule = new GlideSchedule((<cmn_scheduleFields>context.schedule).sys_id);
                scratchpad.approval_deadline = schedule.add(new GlideDateTime(), new GlideDuration(259200000)).toString();
                workflow.debug("Setting approval deadline for " + scratchpad.approval_deadline);
                return 'yes';
            }
            (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
            return 'no';
        })(workflow.scratchpad, <wf_contextElement>current.context);
    }

    // Approve-by variable expired, approval change or closed
    function approval_expiration_or_close(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer;

        answer = (function (scratchpad) {
            if (!gs.nil(scratchpad.approval_deadline)) {
                var approveBy: GlideDateTime = new GlideDateTime(scratchpad.approval_deadline);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad);
    }
    function on_approval_subflow_return(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        workflow.debug('Approval occurred');
        workflow.scratchpad.approval_deadline = undefined;
    }
    function wait_approve_or_3_days(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer;
        
        answer = (function (scratchpad: UsasocHwRequestItemScratchPad): 'yes' | 'no' {
            if (!gs.nil(scratchpad.approval_deadline)) {
                var approveBy = new GlideDateTime(scratchpad.approval_deadline);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad);
    }
    function check_approval_subflow_finished(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer = gs.nil(workflow.scratchpad.approval_deadline);
    }
    function fallback_approvals(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        var answer: string[] = [];
        answer.push(UsasocScCatItem.getDefaultScCatItemApprovalGroupSysId());
    }
    function isNotClosed(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow) {
        var answer = (function (scratchpad: UsasocHwRequestItemScratchPad): 'yes' | 'no' {
            var th: x_44813_usasoc_cst.TaskHelper = new x_44813_usasoc_cst.TaskHelper(current);
            if (th.isClosed())
                return 'no';
            if (th.isPending())
                th.setOpen();
            if (gs.nil(current.assignment_group) && gs.nil(current.assigned_to)) {
                var gr: sys_user_groupElement | sys_user_groupGlideRecord = <sys_user_groupElement>(<sc_cat_itemElement>current.cat_item).group;
                if (gs.nil(gr)) {
                    workflow.warn("Catalog item " + (<sc_cat_itemElement>current.cat_item).sys_id + " does not have an assignment group");
                    gr = UsasocScCatItem.getDefaultScCatItemAssignmentGroup();
                    if (gs.nil(gr)) {
                        workflow.error("Failed to get default assignment group");
                        return 'yes';
                    }
                }
                current.assignment_group = gr;
            }
            return 'yes';
        })(workflow.scratchpad);
    }
    function reset_state(current: IUsasocHWRequestItemGlideRecord, workflow: UsasocHwRequestItemWorkflow): void {
        workflow.scratchpad.approval_deadline = undefined;
        (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
    }
}