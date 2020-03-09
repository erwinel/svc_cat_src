/// <reference path="../types/service-now/index.d.ts" />
/// <reference path="../types/service-now/x_44813_usasoc_cst/index.d.ts" />
var usasoc_hardware_item_request;
(function (usasoc_hardware_item_request) {
    function is_initial_routing(current, workflow) {
        var answer = (function (scratchpad, context) {
            if (gs.nil(scratchpad.approveBy)) {
                workflow.debug('Getting schedule');
                var schedule = new GlideSchedule(context.schedule.sys_id);
                scratchpad.approveBy = schedule.add(new GlideDateTime(), new GlideDuration(259200000)).toString();
                workflow.debug("Setting approval deadline for " + scratchpad.approveBy);
                return 'yes';
            }
            (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
            return 'no';
        })(workflow.scratchpad(), current.context);
    }
    function on_approval_subflow_return(current, workflow) {
        workflow.debug('Approval occurred');
        workflow.scratchpad().approveBy = undefined;
    }
    function wait_approve_or_3_days(current, workflow) {
        var answer;
        answer = (function (scratchpad) {
            if (!gs.nil(scratchpad.approveBy)) {
                var approveBy = new GlideDateTime(scratchpad.approveBy);
                if (approveBy.before(new GlideDateTime()))
                    return 'no';
            }
            return 'yes';
        })(workflow.scratchpad());
    }
    function check_approval_subflow_finished(current, workflow) {
        var answer = gs.nil(workflow.scratchpad().approveBy);
    }
    function fallback_approvals(current, workflow) {
        var answer = [];
        answer.push((new x_44813_usasoc_cst.USASOCCustomizations()).getDefaultScCatItemApprovalGroupSysId());
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
                    gr = (new x_44813_usasoc_cst.USASOCCustomizations()).getDefaultScCatItemAssignmentGroup();
                    if (gs.nil(gr)) {
                        workflow.error("Failed to get default assignment group");
                        return 'yes';
                    }
                }
                current.assignment_group = gr;
            }
            return 'yes';
        })(workflow.scratchpad());
    }
    function reset_state(current, workflow) {
        workflow.scratchpad().approveBy = undefined;
        (new x_44813_usasoc_cst.TaskHelper(current)).setPending();
    }
})(usasoc_hardware_item_request || (usasoc_hardware_item_request = {}));
