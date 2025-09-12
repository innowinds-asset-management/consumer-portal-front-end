"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row, Alert } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { serviceContractService, ServiceContractStatsData } from "@/services/api/serviceContract";
import { FILTER_TYPES } from "@/utils/constants";

// Filter interface for service contract filtering
export interface ServiceContractFilter {
  type: typeof FILTER_TYPES.expiring | typeof FILTER_TYPES.expired | null;
  days: number | null;
}

interface AmcCmcStatProps {
  onRefresh?: () => void;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  onFilterChange?: (filter: ServiceContractFilter) => void;
  currentFilter?: ServiceContractFilter;
}

const AmcCmcStat: React.FC<AmcCmcStatProps> = ({ 
  onRefresh,
  autoRefresh = false,
  refreshInterval = 30000, // 30 seconds default
  onFilterChange,
  currentFilter
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ServiceContractStatsData>(); 
  
  // Fetch service contract statistics
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await serviceContractService.getServiceContractStats();
      setStats(response.payload as ServiceContractStatsData);
    } catch (err) {
      console.error('Error fetching service contract stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch service contract statistics');
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
    if (onRefresh) {
      onRefresh();
    }
  };

  // Handle stat card click
  const handleStatClick = (type: typeof FILTER_TYPES.expiring | typeof FILTER_TYPES.expired, days: number) => {
    if (onFilterChange) {
      // If clicking the same filter, clear it; otherwise set new filter
      if (currentFilter?.type === type && currentFilter?.days === days) {
        onFilterChange({ type: null, days: null });
      } else {
        onFilterChange({ type, days });
      }
    }
  };

  // Dynamic configuration for different stat types and timeframes
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
      type: FILTER_TYPES.expiring,
      days: 5,
      priority: 1
    },
    {
      title: stats.expiringSoon.in10days.title,
      value: stats.expiringSoon.in10days.count,
      subtitle: stats.expiringSoon.in10days.text,
      ...getStatConfig('expiring', '10'),
      type: FILTER_TYPES.expiring,
      days: 10,
      priority: 2
    },
    {
      title: stats.expiringSoon.in30days.title,
      value: stats.expiringSoon.in30days.count,
      subtitle: stats.expiringSoon.in30days.text,
      ...getStatConfig('expiring', '30'),
      type: FILTER_TYPES.expiring,
      days: 30,
      priority: 3
    },
    // Recently Expired Stats
    {
      title: stats.recentlyExpired.in5Days.title,
      value: stats.recentlyExpired.in5Days.count,
      subtitle: stats.recentlyExpired.in5Days.text,
      ...getStatConfig('expired', '5'),
      type: FILTER_TYPES.expired,
      days: 5,
      priority: 1
    },
    {
      title: stats.recentlyExpired.in10Days.title,
      value: stats.recentlyExpired.in10Days.count,
      subtitle: stats.recentlyExpired.in10Days.text,
      ...getStatConfig('expired', '10'),
      type: FILTER_TYPES.expired,
      days: 10,
      priority: 2
    },
    {
      title: stats.recentlyExpired.in30Days.title,
      value: stats.recentlyExpired.in30Days.count,
      subtitle: stats.recentlyExpired.in30Days.text,
      ...getStatConfig('expired', '30'),
      type: FILTER_TYPES.expired,
      days: 30,
      priority: 3
    }
  ].sort((a, b) => {
    // Sort by type first (expiring before expired), then by priority
    if (a.type !== b.type) {
      return a.type === FILTER_TYPES.expiring ? -1 : 1;
    }
    return a.priority - b.priority;
  }) : [];

  // Show error state
  if (error) {
    return (
      <Alert variant="danger" className="mb-4">
        <Alert.Heading>Error Loading Service Contract Statistics</Alert.Heading>
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
                <h4 className="header-title">Service Contract Dashboard</h4>
                {stats && (
                  <p className="mb-0">
                    <strong>Total Service Contracts:</strong> <strong>{stats.totalServiceContracts}</strong>
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
                  {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        {statItems.map((item, index) => {
          const isActive = currentFilter?.type === item.type && currentFilter?.days === item.days;
          const isClickable = onFilterChange && item.value > 0;
          
          return (
            <Col key={index} xs={12} sm={6} lg={4} className="mb-3">
              <Card 
                className={`h-100 ${isClickable ? 'cursor-pointer' : ''} ${isActive ? 'border-primary shadow-sm' : ''}`}
                title={`${item.title}: ${item.value} - ${item.subtitle}${isClickable ? ' (Click to filter)' : ''}`}
                onClick={isClickable ? () => handleStatClick(item.type, item.days) : undefined}
                style={isClickable ? { cursor: 'pointer', transition: 'all 0.2s ease' } : {}}
              >
                <CardBody>
                  <div className="d-flex align-items-start gap-2 justify-content-between">
                    <div>
                      <h5 
                        className="text-muted fs-13 fw-bold text-uppercase" 
                        title={item.title}
                      >
                        {item.title}
                        {isActive && (
                          <IconifyIcon 
                            icon="solar:check-circle-bold-duotone" 
                            className="ms-2 text-primary" 
                            style={{ fontSize: '1rem' }}
                          />
                        )}
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
                        {isClickable && (
                          <span className="d-block text-primary small mt-1">
                            <IconifyIcon icon="solar:hand-stars-bold-duotone" className="me-1" />
                            Click to filter
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="avatar-lg flex-shrink-0">
                      <span className={`avatar-title bg-${item.color}-subtle text-${item.color} rounded fs-28 ${isActive ? 'border border-primary' : ''}`}>
                        <IconifyIcon icon={item.icon} />
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AmcCmcStat;
