"use client";

import React from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

interface WarrantyStatProps {
  stats?: {
    expiringSoon5Days?: number;
    expiringSoon10Days?: number;
    expiringNext30Days?: number;
    expiredLast5Days?: number;
    expiredLast10Days?: number;
    expiredLastMonth?: number;
  };
  trends?: {
    expiringSoon5Days?: number;
    expiringSoon10Days?: number;
    expiringNext30Days?: number;
    expiredLast5Days?: number;
    expiredLast10Days?: number;
    expiredLastMonth?: number;
  };
  onRefresh?: () => void;
  loading?: boolean;
}

const WarrantyStat: React.FC<WarrantyStatProps> = ({ 
  stats = {
    expiringSoon5Days: 10,
    expiringSoon10Days: 12,
    expiringNext30Days: 8,
    expiredLast5Days: 10,
    expiredLast10Days: 14,
    expiredLastMonth: 120
  },
  trends,
  onRefresh,
  loading = false
}) => {
  const statItems = [
    {
      title: "Expiring Soon",
      value: stats.expiringSoon5Days,
      subtitle: "In coming 5 days",
      icon: "solar:shield-check-bold-duotone",
      color: "success",
      trend: trends?.expiringSoon5Days && trends.expiringSoon5Days > 0 ? "up" : "down",
      trendValue: trends?.expiringSoon5Days ? `${Math.abs(trends.expiringSoon5Days).toFixed(1)}%` : "0%"
    },
    {
      title: "Expiring Soon",
      value: stats.expiringSoon10Days,
      subtitle: "In coming 10 days",
      icon: "solar:check-circle-bold-duotone",
      color: "info",
      trend: trends?.expiredLast10Days && trends.expiredLast10Days > 0 ? "up" : "down",
      trendValue: trends?.expiredLast10Days ? `${Math.abs(trends.expiredLast10Days).toFixed(1)}%` : "0%"
    },
    {
      title: "Expiring Soon",
      value: stats.expiringNext30Days,
      subtitle: "Next 30 days",
      icon: "solar:calendar-bold-duotone",
      color: "warning",
      trend: trends?.expiringNext30Days && trends.expiringNext30Days > 0 ? "up" : "down",
      trendValue: trends?.expiringNext30Days ? `${Math.abs(trends.expiringNext30Days).toFixed(1)}%` : "0%"
    },
    {
      title: "Expired",
      value: stats.expiredLast5Days,
      subtitle: "Since last 5 days",
      icon: "solar:wallet-bold-duotone",
      color: "primary",
      trend: trends?.expiredLast5Days && trends.expiredLast5Days > 0 ? "up" : "down",
      trendValue: trends?.expiredLast5Days ? `${Math.abs(trends.expiredLast5Days).toFixed(1)}%` : "0%"
    },
    {
      title: "Expired",
      value: stats.expiredLast10Days,
      subtitle: "Since last 10 days",
      icon: "solar:close-circle-bold-duotone",
      color: "danger",
      trend: trends?.expiredLast10Days && trends.expiredLast10Days > 0 ? "up" : "down",
      trendValue: trends?.expiredLast10Days ? `${Math.abs(trends.expiredLast10Days).toFixed(1)}%` : "0%"
    },
    {
      title: "Expired",
      value: stats.expiredLastMonth,
      subtitle: "Since last month",
      icon: "solar:clock-circle-bold-duotone",
      color: "secondary",
      trend: trends?.expiredLastMonth && trends.expiredLastMonth > 0 ? "up" : "down",
      trendValue: trends?.expiredLastMonth ? `${Math.abs(trends.expiredLastMonth).toFixed(1)}%` : "0%"
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? "ri:arrow-up-line" : "ri:arrow-down-line";
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-danger";
  };

  return (
    <>
      {onRefresh && (
        <div className="d-flex justify-content-end mb-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          >
            <i className={`ri-refresh-line ${loading ? 'fa-spin' : ''}`}></i>
            {loading ? 'Refreshing...' : 'Refresh Stats'}
          </button>
        </div>
      )}
      <Row className="row-cols-3 row-cols-md-3 row-cols-sm-2 row-cols-1 mb-4">
      {statItems.map((item, index) => (
        <Col key={index}>
          <Card className="h-100" title={`${item.title}: ${item.value} - ${item.subtitle}`}>
            <CardBody>
              <div className="d-flex align-items-start gap-2 justify-content-between">
                <div>
                  <h5 
                    className="text-muted fs-13 fw-bold text-uppercase" 
                    title={item.title}
                  >
                    {item.title}
                  </h5>
                  <h3 className="mt-2 mb-1 fw-bold">
                    {loading ? (
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      item.value
                    )}
                  </h3>
                  <p className="mb-0 text-muted">
                    <span className={`${getTrendColor(item.trend)} me-1`}>
                      <IconifyIcon 
                        icon={getTrendIcon(item.trend)} 
                        style={{ marginBottom: '5px', marginRight: '5px' }} 
                      />
                      {item.trendValue}
                    </span>
                    <span className="text-nowrap">{item.subtitle}</span>
                  </p>
                </div>
                <div className="avatar-lg flex-shrink-0">
                  <span className={`avatar-title bg-${item.color}-subtle text-${item.color} rounded fs-28`}>
                    <IconifyIcon icon={item.icon} />
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
        </Row>
      </>
    );
  };

export default WarrantyStat;
