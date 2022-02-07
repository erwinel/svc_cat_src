/// <reference path="../types/index.d.ts" />
/// <reference path="../UsasocScCatItem.ts" />
/**
 * USASOC Hardware Item Request
 * @namespace usasoc_hardware_item_request
 */
var usasoc_hardware_item_request;
(function (usasoc_hardware_item_request) {
    // Is default approval group
    function is_default_approval_group(current, workflow) {
        var answer;
        answer = ifScript();
        function ifScript() {
            var th = new x_44813_usasoc_cst.TaskHelper(current);
            var group = th.getDefaultApprovalGroupByCallerLocation();
            if (gs.nil(group)) {
                group = UsasocScCatItem.getDefaultScCatItemApprovalGroup();
                if (gs.nil(group))
                    gs.addInfoMessage("Warning! An internal error occured while setting up request approvals. Please refer this message to the ServiceNow administrator." +
                        "\n<br />Timestamp: " + (new GlideDateTime()).getInternalFormattedLocalTime() + "; Number: " + current.number);
                else
                    workflow.scratchpad.approval_group = group.sys_id;
            }
            if (group.sys_id == UsasocScCatItem.getDefaultScCatItemApprovalGroupSysId()) {
                return 'yes';
            }
            return 'no';
        }
    }
    function is_initial_routing(current, workflow) {
        var answer = (function (scratchpad, context) {
            if (gs.nil(scratchpad.approval_deadline)) {
                workflow.debug('Getting schedule');
                var schedule = new GlideSchedule(context.schedule.sys_id);
                scratchpad.approval_deadline = schedule.add(new GlideDateTime(), new GlideDuration(259200000)).toString();
                workflow.debug("Setting approval deadline for " + scratchpad.approval_deadline);
                return 'yes';
            }
            (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
            return 'no';
        })(workflow.scratchpad, current.context);
    }
    // Approve-by variable expired, approval change or closed
    function approval_expiration_or_close(current, workflow) {
        var answer;
        answer = (function (scratchpad) {
            if (!gs.nil(scratchpad.approval_deadline)) {
                var approveBy = new GlideDateTime(scratchpad.approval_deadline);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad);
    }
    function on_approval_subflow_return(current, workflow) {
        workflow.debug('Approval occurred');
        workflow.scratchpad.approval_deadline = undefined;
    }
    function wait_approve_or_3_days(current, workflow) {
        var answer;
        answer = (function (scratchpad) {
            if (!gs.nil(scratchpad.approval_deadline)) {
                var approveBy = new GlideDateTime(scratchpad.approval_deadline);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad);
    }
    function check_approval_subflow_finished(current, workflow) {
        var answer = gs.nil(workflow.scratchpad.approval_deadline);
    }
    function fallback_approvals(current, workflow) {
        var answer = [];
        answer.push(UsasocScCatItem.getDefaultScCatItemApprovalGroupSysId());
    }
    function isNotClosed(current, workflow) {
        var answer = (function (scratchpad) {
            var th = new x_44813_usasoc_cst.TaskHelper(current);
            if (th.isClosed())
                return 'no';
            if (th.isPending())
                th.setOpen();
            if (gs.nil(current.assignment_group) && gs.nil(current.assigned_to)) {
                var gr = current.cat_item.group;
                if (gs.nil(gr)) {
                    workflow.warn("Catalog item " + current.cat_item.sys_id + " does not have an assignment group");
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
    function reset_state(current, workflow) {
        workflow.scratchpad.approval_deadline = undefined;
        (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
    }
})(usasoc_hardware_item_request || (usasoc_hardware_item_request = {}));
