"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row, Alert } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { warrantyService, WarrantyStatsData } from "@/services/api/warranty";

interface WarrantyStatProps {
  onRefresh?: () => void;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

const WarrantyStat: React.FC<WarrantyStatProps> = ({ 
  onRefresh,
  autoRefresh = false,
  refreshInterval = 30000 // 30 seconds default
}) => {
  const [stats, setStats] = useState<WarrantyStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch warranty statistics
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await warrantyService.getWarrantyStats();
      setStats(response.payload);
    } catch (err) {
      console.error('Error fetching warranty stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch warranty statistics');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStats();
  }, []);

  // Auto refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchStats, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchStats();
    onRefresh?.();
  };

  // Dynamic configuration for different stat types and timeframes
  // This function returns appropriate icon and color based on stat type and timeframe
  const getStatConfig = (type: 'expiring' | 'expired', timeframe: '5' | '10' | '30') => {
    const configs = {
      expiring: {
        '5': { icon: "solar:clock-circle-bold-duotone", color: "warning" },
        '10': { icon: "solar:calendar-bold-duotone", color: "info" },
        '30': { icon: "solar:shield-check-bold-duotone", color: "success" }
      },
      expired: {
        '5': { icon: "solar:close-circle-bold-duotone", color: "danger" },
        '10': { icon: "solar:exclamation-circle-bold-duotone", color: "warning" },
        '30': { icon: "solar:clock-circle-bold-duotone", color: "secondary" }
      }
    } as const;
    return configs[type][timeframe] || { icon: "solar:info-circle-bold-duotone", color: "primary" };
  };

  // Create dynamic array based on stats data
  const statItems = stats ? [
    // Expiring Soon Stats
    {
      title: stats.expiringSoon.in5Days.title,
      value: stats.expiringSoon.in5Days.count,
      subtitle: stats.expiringSoon.in5Days.text,
      ...getStatConfig('expiring', '5'),
      type: "expiring",
      priority: 1
    },
    {
      title: stats.expiringSoon.in10Days.title,
      value: stats.expiringSoon.in10Days.count,
      subtitle: stats.expiringSoon.in10Days.text,
      ...getStatConfig('expiring', '10'),
      type: "expiring",
      priority: 2
    },
    {
      title: stats.expiringSoon.in30Days.title,
      value: stats.expiringSoon.in30Days.count,
      subtitle: stats.expiringSoon.in30Days.text,
      ...getStatConfig('expiring', '30'),
      type: "expiring",
      priority: 3
    },
    // Recently Expired Stats
    {
      title: stats.recentlyExpired.inLast5Days.title,
      value: stats.recentlyExpired.inLast5Days.count,
      subtitle: stats.recentlyExpired.inLast5Days.text,
      ...getStatConfig('expired', '5'),
      type: "expired",
      priority: 1
    },
    {
      title: stats.recentlyExpired.inLast10Days.title,
      value: stats.recentlyExpired.inLast10Days.count,
      subtitle: stats.recentlyExpired.inLast10Days.text,
      ...getStatConfig('expired', '10'),
      type: "expired",
      priority: 2
    },
    {
      title: stats.recentlyExpired.inLast30Days.title,
      value: stats.recentlyExpired.inLast30Days.count,
      subtitle: stats.recentlyExpired.inLast30Days.text,
      ...getStatConfig('expired', '30'),
      type: "expired",
      priority: 3
    }
  ].sort((a, b) => {
    // Sort by type first (expiring before expired), then by priority
    if (a.type !== b.type) {
      return a.type === 'expiring' ? -1 : 1;
    }
    return a.priority - b.priority;
  }) : [];

  // Show error state
  if (error) {
    return (
      <Alert variant="danger" className="mb-4">
        <Alert.Heading>Error Loading Warranty Statistics</Alert.Heading>
        <p>{error}</p>
        <button 
          onClick={handleRefresh}
          className="btn btn-outline-danger btn-sm"
        >
          <i className="ri-refresh-line me-2"></i>
          Try Again
        </button>
      </Alert>
    );
  }

  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="border-bottom card-tabs d-flex flex-wrap align-items-center gap-2">
              <div className="flex-grow-1">
                <h4 className="header-title">Warranty Statistics</h4>
                {stats && (
                  <p className="text-muted mb-0">
                    Total Warranties without AMC/CMC: <strong>{stats.totalWarrantiesWithoutAmcCmc}</strong>
                  </p>
                )}
              </div>
              <div className="d-flex flex-wrap flex-lg-nowrap gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                >
                  <i className={`ri-refresh-line ${loading ? 'fa-spin' : ''}`}></i>
                  {loading ? 'Refreshing...' : 'Refresh Stats'}
                </button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        {statItems.map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={4} className="mb-3">
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
