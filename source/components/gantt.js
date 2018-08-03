/*global gantt*/
import React, { Component } from 'react';
import 'dhtmlx-gantt';
import {diff} from 'deep-object-diff'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import apiHelpers from "../helpers/apiHelpers";

export default class Gantt extends Component {
    setZoom(value){
        switch (value){
            case 'Hours':
                gantt.config.scale_unit = 'day';
                gantt.config.date_scale = '%d %M';

                gantt.config.scale_height = 60;
                gantt.config.min_column_width = 30;
                gantt.config.subscales = [
                    {unit:'hour', step:1, date:'%H'}
                ];
                break;
            case 'Days':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "week";
                gantt.config.date_scale = "#%W";
                gantt.config.subscales = [
                    {unit: "day", step: 1, date: "%d %M"}
                ];
                gantt.config.scale_height = 60;
                break;
            case 'Months':
                gantt.config.min_column_width = 70;
                gantt.config.scale_unit = "month";
                gantt.config.date_scale = "%F";
                gantt.config.scale_height = 60;
                gantt.config.subscales = [
                    {unit:"week", step:1, date:"#%W"}
                ];
                break;
            default:
                break;
        }
    }

    shouldComponentUpdate(nextProps ){
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    initGanttEvents() {
        if(gantt.ganttEventsInitialized){
            return;
        }
        gantt.ganttEventsInitialized = true;

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            if(this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'inserted',task);
                const projectId = this.props.project.id
                let changed = diff(this.props.tasksNormalized.entities.tasks[id], task)
                changed.name = changed.text
                changed.time_spend = changed.timeSpend
                changed.start_at = formatDate(changed.start_date.toString())
                changed.end_at = formatDate(changed.end_date.toString())

                //Rework later
                delete changed.active
                delete changed.progress
                delete changed.text

                delete changed.start_date
                delete changed.end_date
                delete changed.startAt
                delete changed.endAt
                delete changed.createdBy
                delete changed.createdAt
                delete changed.duration
                delete changed.timeSpend
                delete changed.details

                delete changed.id
                delete changed.$index
                delete changed.$level
                delete changed.$no_end
                delete changed.$no_start
                delete changed.$open
                delete changed.$rendered_parent
                delete changed.$rendered_type
                delete changed.$source
                delete changed.$target

                apiHelpers.apiPost(`projects/${projectId}/tasks`, changed).then(response => {
                    if (response.status === 201) {
                       // this.props.reloadHandle()
                    } else {
                        // TODO: error feedback
                        //this.props.reloadHandle()
                    }
                })
                location.reload(true)
            }
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            if(this.props.onTaskUpdated) {
                let changed = diff(this.props.tasksNormalized.entities.tasks[id], task)
                changed.name = changed.text
                changed.time_spend = changed.timeSpend
                changed.start_at = formatDate(changed.start_date.toString())
                changed.end_at = formatDate(changed.end_date.toString())
                //Rework later
                delete changed.users
                delete changed.text
                delete changed.active
                delete changed.progress
                delete changed.$index
                delete changed.$level
                delete changed.$no_end
                delete changed.$no_start
                delete changed.$open
                delete changed.$rendered_parent
                delete changed.$rendered_type
                delete changed.$source
                delete changed.$target
                delete changed.start_date
                delete changed.end_date
                delete changed.startAt
                delete changed.endAt
                delete changed.createdBy
                delete changed.createdAt
                delete changed.duration
                delete changed.timeSpend
                delete changed.details
                this.props.onTaskUpdated(id, 'updated', task);
                apiHelpers.apiPatch("tasks", changed, id).then(response => {
                    if (response.status === 200) {
                        this.props.reloadHandle()
                    } else {
                        // TODO: error feedback
                        this.props.reloadHandle()
                    }
                })
            }
        });

        gantt.attachEvent('onAfterTaskDelete', (id) => {
            if(this.props.onTaskUpdated) {
                this.props.onTaskUpdated(id, 'deleted');
                apiHelpers.apiDelete("tasks", id).then(response => {
                    if (response.status === 200) {
                        this.props.reloadHandle()
                    } else {
                        // TODO: error feedback
                        this.props.reloadHandle()
                    }
                })
            }
        });

        gantt.attachEvent('onAfterLinkAdd', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'inserted', link);
            }
        });

        gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'updated', link);
            }
        });

        gantt.attachEvent('onAfterLinkDelete', (id, link) => {
            if(this.props.onLinkUpdated) {
                this.props.onLinkUpdated(id, 'deleted');
            }
        });
        gantt.attachEvent("onBeforeLightbox",(id) =>{
            var task = gantt.getTask(id)
            var users = ""
            if(task.users){
                task.users.map((user, i) =>{
                    users += "<span>" + user.firstname+ " " + user.lastname + "</span>"
                })
            }

            task.details = "<span id='users'>Users: </span>"+ users+
                "<span id='progress'> Progress :</span>" + task.progress*100 + " %" +
                "<span id='cost'> Cost :</span>" + task.cost + " €"

            return true
        })
    }

    componentDidMount() {

        this.initGanttEvents();
        gantt.init(this.ganttContainer);
        gantt.clearAll()
        gantt.parse(this.props.tasks);

        gantt.config.lightbox.sections=[
            {name:"name", height:30, map_to:"text", type:"textarea"},
            {name:"details", height:16, type:"template", map_to:"details"},
            {name:"description", height:30, map_to:"description", type:"textarea"},
            {name:"cost", height:30, map_to:"cost", type:"textarea"},
            {name:"time_spend", height:30, map_to:"time_spend", type:"textarea"},
            {name:"time",        height:60, map_to:{start_date:"start_at",end_date:"end_at"}, type:"time"},
            {name:"parent", type:"parent", allow_root:"true", root_label:"Pas de parent"},
            // {name:"users", map_to:"users", type:"checkbox", options:gantt.serverList("users")},
            {name:"status",  height: 22, map_to:"status", type:"select", options: [
                {key: 1, label:"A faire"},
                {key: 2, label: "En cours"},
                {key: 3, label: "Terminée"},
                {key: 4, label: "Validée"}
                ]},
            ]
        gantt.locale.labels.section_name = "Nom de la Tache"
        gantt.locale.labels.section_details = "Details"
        gantt.locale.labels.section_time = "Durée"
        gantt.locale.labels.section_parent = "Tache parente"
        gantt.locale.labels.section_status = "Statut"
        // gantt.locale.labels.section_users = "Ajouter a la tache"
        gantt.locale.labels.section_cost = "Coût de la tache"
        gantt.locale.labels.section_time_spend = "Temps passé"
    }


    render() {
        this.setZoom(this.props.zoom);

        return (
            <div
                ref={(input) => { this.ganttContainer = input }}
                style={{width: '100%', height: '100%'}}
            ></div>
        );
    }
}
function formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-')
}

